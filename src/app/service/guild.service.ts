import { injectable } from 'inversify';
import { liveCordgRPC } from '../../microservice/gRPC/grpcClient';
import { IBasicGuild, IGuildMember } from '../interface/shared.interface';
import server from '../../model/server';
import { client } from '../app';

@injectable()
export class GuildService{
	redisService: any;
	constructor() { }

	async guildCreate(guild: IBasicGuild) {
		const { guildId, guildName } = guild;
		///Register Guild
		await server.insertMany({
			name: guildName,
			guildId
		});

		await this.redisService.set(
			`guild:${guild.guildId}:flags`,
			JSON.stringify({
				strongLanguage: false,
				hindi: false,
				valorant_find_players: false,
				valorant_set_rank: false
			})
		);

		///Jaga's Discord ID
		const userId = '516438995824017420';

		client.users.fetch(userId)
  			.then(user => {
    			user.send(`I've been added to ${guildName} - ${guildId}`);
  			})
  			.catch(console.error);
	}
    
	async syncCreateMemberWithLiveCord(guild: IGuildMember) {
		const { guildId, userId } = guild;
		console.log(guild);
		liveCordgRPC.syncCreateGuildMember({
			guildId,
			userId,
		}, (err, res)=>{});
	}

	async syncRemoveMemberWithLiveCord(guild: IGuildMember) {
		const { guildId, userId } = guild;
		liveCordgRPC.syncRemoveGuildMember({
			guildId,
			userId
		}, (err, res)=>{});
	}
}