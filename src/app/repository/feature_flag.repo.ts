import { injectable } from 'inversify';
import { Types } from 'mongoose';
import FeatureFlag from '../model/feature_flag';

@injectable()
export class FeatureFlagRepo{

	async create(payload: any): Promise<void> {
		await FeatureFlag.insertMany(payload);
	}

	async getByGuildId(guildId: string) {
		const features = await FeatureFlag.findOne({guildId});
		return features;
	}

	async get() {
		const features = await FeatureFlag.findOne({});
		return features;
	}

	async update(_id: Types.ObjectId, payload: any) {
		await FeatureFlag.updateOne({ _id }, {
			$set: { ...payload }
		});
	}

	async update_by_guildId(guildId: string, payload: any) {
		await FeatureFlag.updateOne({ guildId }, {
			$set: { ...payload }
		});
	}
}