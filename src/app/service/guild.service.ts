import { injectable } from 'inversify';
import { liveCordgRPC } from '../../microservice/gRPC/grpcClient';
import { IGuildMember } from '../interface/shared.interface';

@injectable()
export class GuildService{
	constructor() { }
    
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