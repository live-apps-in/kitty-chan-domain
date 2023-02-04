import { inject, injectable } from 'inversify';
import { client } from '../../../app/app';
import { ServerRepo } from '../../../app/repository/server.repo';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify.types';


@injectable()
export class GuildService{
	constructor(
        @inject(TYPES.ServerRepo) private readonly serverRepo: ServerRepo
	) { }
    
	///Guild Profile
	async fetch_guild_profile(discord_id: string, guildId: string) {
		///Check Permission
		const checkPermission = await this.check_user_permission(discord_id, guildId);
		if(!checkPermission.hasPermission) throw new HttpException('Forbidden Guild Access', 403);

		const guild = await this.serverRepo.getByGuildId(guildId);
		return guild;
	}
    
	///Update Guild Feature
	async edit_guild_features(discord_id: string, guildId: string, permission: any) {
		///Check Permission
		const checkPermission = await this.check_user_permission(discord_id, guildId);
		if (!checkPermission.hasPermission) throw new HttpException('Forbidden Guild Access', 403);
        
		const guild = await this.serverRepo.getByGuildId(guildId);
        

	}

	///Check User Guild Permission
	async check_user_permission(discord_id: string, guildId: string) {
		const userPermission: any = { hasPermission: true };
    
		try {
			const guild = await client.guilds.fetch(guildId);

			if (guild.ownerId !== discord_id) {
				userPermission.hasPermission = false;
				return userPermission;
			}

		} catch (error) {
			userPermission.hasPermission = false;
			return userPermission;
		}

		return userPermission;
	}
}