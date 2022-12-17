import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { randomNumber } from '../../utils/calc';
import { REPLY } from '../enum/reply';
import { IGuild } from '../interface/shared.interface';
import Server from '../model/server';
import Portal from '../model/portal';
import { ServerRepo } from '../repository/server.repo';
import { ResponseService } from './shared/response.service';


@injectable()
export class PortalService{
	constructor(
        @inject(TYPES.ServerRepo) private readonly serverRepo: ServerRepo,
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) {}

	/////VALIDATION
	async validate(messageChunk: string[], guild: IGuild) {
        
		if (messageChunk[2] === 'set') {
			await this.setPortal(guild);
		}

		if (messageChunk[2] === 'join') {
			await this.join(guild, messageChunk[3]);
		}

		if (messageChunk[2] === 'leave') {
			await this.leave(guild);
		}
	}

	////Validate Channel
	async validate_channel(guild: IGuild) {
		const guildId = guild.guildId.toString();
		const channelId = guild.channelId.toString();
		const server = await Server.findOne({ guildId });

		///Check if portal command
		const messageChunk = guild.messageContent.split(' ');
		if (messageChunk[1] === 'portal') return;

		if (server?.portal?.channel !== channelId) return;
        
		const portal = await Portal.findOne({'guild.guildId': guildId});
		if (!portal || portal?.guild?.length === 1) return;


		///Notify Other Portal Members
		const getSessionGuild = await this.getSessionMembers(guild);
		if (!getSessionGuild || getSessionGuild.length === 0) return;

		getSessionGuild.map(e => e.message = `[ ${guild.username} from **${guild.guildName}** ]: ${guild.messageContent}`);

		await this.message(getSessionGuild);
		return true;

	}

	///Set current channel as Portal
	private async setPortal(guild: IGuild) {
		const guildId = guild.guildId.toString();

		///Update Portal Channel
		await this.serverRepo.update_by_guildId(guildId, {
			portal: {
				channel: guild.channelId.toString()
			}
		});

		await this.reply('I have updated the Portal! 💫. This channel will receive messages from other server Portals!', guild);
	}


	///Join an existing Portal Connection
	private async join(guild: IGuild, pass: string) {
		const guildId = guild.guildId.toString();
		const channelId = guild.channelId.toString();
		const server = await Server.findOne({ guildId });

		///Check for valid Portal Channel
		if (server?.portal?.channel !== channelId) {
			await this.reply('You should be in the Portal channel to Join a Session!  ⭕', guild);
			return;
		}

		///Check for existing Portal Session
		const getPortal = await Portal.findOne({ 'guild.guildId': guildId });
		if (getPortal) {
			await this.reply('A Portal session is already active!  ⭕', guild);
			return;
		}

		///Join Session
		await Portal.updateOne({ pass }, {
			$push: {
				guild: {
					serverName: guild.guildName,
					guildId,
					channelId
				}
			}
		});
		await this.reply('Successfully Joined the Portal! ✔', guild);

		///Notify Other Portal Members
		const getSessionGuild = await this.getSessionMembers(guild);
		if (!getSessionGuild || getSessionGuild.length === 0) return;
		getSessionGuild.map(e => e.message = `[ **${guild.guildName}** ]: Joined the Portal! 🎉`);

		await this.message(getSessionGuild);

	}

	///Leave Portal Session
	private async leave(guild: IGuild) {
		const guildId = guild.guildId.toString();

		///Get Current Portal session
		const portal = await Portal.findOne({ 'guild.guildId': guildId });
		if (!portal) {
			await this.reply('No current sessions found! ⭕', guild);
			return;
		}
	
		///Notify other portal members if any
		const getSessionGuild = await this.getSessionMembers(guild);
		if (getSessionGuild || getSessionGuild.length !== 0) { 
			getSessionGuild.map(e => e.message = `[ **${guild.guildName}** ]: Left the Portal! ❌`);
		}

		await this.message(getSessionGuild);

		await Portal.updateOne({ 'guild.guildId': guildId }, {
			$pull: {
				guild: {
					guildId
				}
			}
		});
		
		await this.reply('Portal Session Ended ❌', guild);
		return;
	}

	private async getSessionMembers(guild: IGuild) {
		const guildId = guild.guildId.toString();

		const portal = await Portal.findOne({ 'guild.guildId': guildId });
		if (!portal) return [];

		const guilds: any[] = [];
       
		for (let index = 0; index < portal.guild.length; index++) {
			const e = portal.guild[index];

			if (e.guildId !== guildId) {
				guilds.push({
					serverName: e.serverName,
					guildId: e.guildId,
					channelId: e.channelId
				});
			}
		}

		return guilds;
	}

	////Common Reply Handler
	private async reply(content: string, guild: IGuild) {
		await this.responseService.respond({
			type: REPLY.replyMessage,
			guild,
			body: {
				content,
				message_reference: {
					message_id: guild.messageId
				}
			}
		});

		return;
	}

	private async message(guilds: any[]) {
		guilds.map(async e => {
			await this.responseService.respond({
			    type: REPLY.sendMessage,
			    guild: {
				    channelId: e.channelId
			    },
			    body: {
				    content: e.message
			    }
		    });
		});
	}
}