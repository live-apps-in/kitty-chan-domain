import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { randomNumber } from '../../utils/calc';
import { REPLY } from '../enum/reply';
import { IGuild } from '../interface/shared.interface';
import FeatureFlag from '../model/feature_flag';
import Portal from '../model/portal';
import { FeatureFlagRepo } from '../repository/feature_flag.repo';
import { ResponseService } from './shared/response.service';


@injectable()
export class PortalService{
	constructor(
        @inject(TYPES.FeatureFlagRepository) private readonly featureFlagRepo: FeatureFlagRepo,
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) {}

	/////VALIDATION
	async validate(messageChunk: string[], guild: IGuild) {
        
		if (messageChunk[2] === 'set') {
			await this.setPortal(guild);
		}

		if (messageChunk[2] === 'create') {
			await this.create(guild);
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
		const server = await FeatureFlag.findOne({ guildId });

		///Check if portal command
		const messageChunk = guild.messageContent.split(' ');
		if (messageChunk[1] === 'portal') return;

		if (server?.portal?.channel !== channelId) return;
        
		const portal = await Portal.findOne({guild: guildId});
		if (!portal || portal?.guild?.length === 1) return;

		const guilds: any[] = [];
       
		for (let index = 0; index < portal.guild.length; index++) {
			const e = portal.guild[index];

			if (e !== guildId) {
				const temp_server = await FeatureFlag.findOne({ guildId: e.toString() });
				guilds.push({
					guildId: e,
					channelId: temp_server.portal.channel,
					message: `[ ${guild.username} from **${guild.guildName}** ]: ${guild.messageContent}`
				});
			}
            
		}

		if (guilds.length === 0) return;
		await this.message(guilds);

	}

	///Set current channel as Portal
	private async setPortal(guild: IGuild) {
		const guildId = guild.guildId.toString();

		///Update Portal Channel
		await this.featureFlagRepo.update_by_guildId(guildId, {
			portal: {
				channel: guild.channelId.toString()
			}
		});

		await this.reply('I have updated your Portal!', guild);
	}

	///Create a new Portal Connection
	private async create(guild: IGuild) {
		const guildId = guild.guildId.toString();
		const channelId = guild.channelId.toString();

		///Get Server Info
		const server = await FeatureFlag.findOne({ guildId });

		///Check if Portal Channel set
		if (!server?.portal?.channel) {
			await this.reply('You should be set portal Channel First', guild);
			return;
		}

		///Check for valid Portal Channel
		if (server?.portal?.channel !== channelId) {
			await this.reply('You should be in the Portal channel to create Connections!', guild);
			return;
		}

		///Check for existing Portal Session
		const getPortal = await Portal.findOne({ guild: guildId });
		if (getPortal) {
			await this.reply('A session is already active', guild);
			return;
		}
        
		///Create new Connection
		await Portal.insertMany({
			guild: [guildId],
			pass: randomNumber(1000, 9999)
		});

		await this.reply('Session Created! Waiting for people from other servers to accept connection!', guild);

	}

	///Join an existing Portal Connection
	private async join(guild: IGuild, pass: string) {
		//Validate Portal Pass
		const getPortalByPass = await Portal.findOne({ pass });
		if (!pass || !getPortalByPass) {
			await this.reply('Invalid Portal Pass!', guild);
			return;
		}

		const guildId = guild.guildId.toString();
		const channelId = guild.channelId.toString();
		const server = await FeatureFlag.findOne({ guildId });

		///Check for valid Portal Channel
		if (server?.portal?.channel !== channelId) {
			await this.reply('You should be in the Portal channel to Join a Session!', guild);
			return;
		}

		///Check for existing Portal Session
		const getPortal = await Portal.findOne({ guild: guildId });
		if (getPortal) {
			await this.reply('A session is already active', guild);
			return;
		}

		///Join Session
		await Portal.updateOne({ pass }, {
			$push: {
				guild: guildId
			}
		});
		await this.reply('Successfully Joined the Session!', guild);

	}

	///Leave Portal Session
	private async leave(guild: IGuild) {
		const guildId = guild.guildId.toString();

		///Get Current Portal session
		const portal = await Portal.findOne({ guild: guildId });
		if (!portal) await this.reply('No current sessions found!', guild);
        
		if (portal.guild.length === 1) {
			await Portal.deleteOne({guild: guildId});
		} else {
			const getSessionGuild = await this.getSessionMembers(guild);
			if (!getSessionGuild || getSessionGuild.length === 0) return;
			getSessionGuild.map(e => e.message = `[ **${guild.guildName}** ]: Left the Portal!`);

			await this.message(getSessionGuild);
			await Portal.updateOne({ guild: guildId }, {
				$pull: {
					guild: guildId
				}
			});
            
		}

		await this.reply('Portal Session Ended', guild);
		return;
	}

	private async getSessionMembers(guild: IGuild) {
		const guildId = guild.guildId.toString();
		const channelId = guild.channelId.toString();
		const server = await FeatureFlag.findOne({ guildId });

		if (server?.portal?.channel !== channelId) return;
        
		const portal = await Portal.findOne({guild: guildId});
		if (!portal || portal?.guild?.length === 1) return;

		const guilds: any[] = [];
       
		for (let index = 0; index < portal.guild.length; index++) {
			const e = portal.guild[index];

			if (e !== guildId) {
				const temp_server = await FeatureFlag.findOne({ guildId: e.toString() });
				guilds.push({
					guildId: e,
					channelId: temp_server.portal.channel
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