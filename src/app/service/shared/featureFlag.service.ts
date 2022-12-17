import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify.types';
import { IGuild } from '../../interface/shared.interface';
import { ServerRepo } from '../../repository/server.repo';


@injectable()
export class FeatureFlagService{
	constructor(
        @inject(TYPES.ServerRepo) private readonly serverRepo: ServerRepo
	) { }

    
	async create_featureFlag(payload: any) {
		await this.serverRepo.create(payload);
	}
    
	async getFeatureFlag(guild: IGuild) {
		return await this.serverRepo.getByGuildId(guild.guildId);
	}

	async viewAllFeatureFlag() {
		return await this.serverRepo.get();
	}

	async update_featureFlag(_id: Types.ObjectId, payload: any) {
		return await this.serverRepo.update(_id, payload);
	}
}
