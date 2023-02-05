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
	async edit_guild_features(discord_id: string, guildId: string, features: any) {
		///Check Permission
		const checkPermission = await this.check_user_permission(discord_id, guildId);
		if (!checkPermission.hasPermission) throw new HttpException('Forbidden Guild Access', 403);
        
		const guild = await this.serverRepo.getByGuildId(guildId);
		const _features = { ...guild.features };
		
		///Map new Permissions
		Object.keys(features).forEach(key => {
			if (key in _features) {
				if(typeof features[key] !== 'boolean') throw new HttpException('Permission value should be Boolean', 400);
    			_features[key] = features[key];
  			}
		});

		await this.serverRepo.update_by_guildId(guildId, { features: _features });
		return _features;
		

	}

	///Check User Guild Permission
	async check_user_permission(discord_id: string, guildId: string) {
		const userPermission: any = { hasPermission: true };
    
		try {
			const guild = await client.guilds.fetch(guildId);

			if ( !guild || guild.ownerId !== discord_id) {
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