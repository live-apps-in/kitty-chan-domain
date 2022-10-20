import { injectable } from 'inversify';
import TextLog from '../model/text_log';


@injectable()
export class TextLogRepository {
    
	async create(payload: any): Promise<void> {
		const saveData = new TextLog(payload);
		await saveData.save();
	}
    
	async getByUserId(userId: string, guildId: string) {
		const textLog = await TextLog.find({
			userId,
			guildId
		});
		return textLog;
	}

	async count_text_log(userId: string, guildId: string): Promise<number> {
		const textLog = await TextLog.countDocuments({
			userId,
			guildId
		});
		return textLog;
	}

	async update(userId: string, guildId: string) {
		await TextLog.updateOne({ userId, guildId }, {
			$inc: { count: 1 }
		});
	}
}