import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify.types';
import { IGuild } from '../../interface/shared.interface';
import { FeatureFlagRepo } from '../../repository/feature_flag.repo';


@injectable()
export class FeatureFlagService{
	constructor(
        @inject(TYPES.FeatureFlagRepository) private readonly featureFlagRepo: FeatureFlagRepo
	) { }

    
	async create_featureFlag(payload: any) {
		await this.featureFlagRepo.create(payload);
	}
    
	async getFeatureFlag(guild: IGuild) {
		return await this.featureFlagRepo.getByGuildId(guild.guildId);
	}

	async viewAllFeatureFlag() {
		return await this.featureFlagRepo.get();
	}

	async update_featureFlag(_id: Types.ObjectId, payload: any) {
		return await this.featureFlagRepo.update(_id, payload);
	}
}
