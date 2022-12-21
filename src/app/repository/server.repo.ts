import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Server from '../../model/server';

@injectable()
export class ServerRepo{

	async create(payload: any): Promise<void> {
		await Server.insertMany(payload);
	}

	async getByGuildId(guildId: string) {
		const features = await Server.findOne({guildId});
		return features;
	}

	async get() {
		const features = await Server.findOne({});
		return features;
	}

	async update(_id: Types.ObjectId, payload: any) {
		await Server.updateOne({ _id }, {
			$set: { ...payload }
		});
	}

	async update_by_guildId(guildId: string, payload: any) {
		await Server.updateOne({ guildId }, {
			$set: { ...payload }
		});
	}
}