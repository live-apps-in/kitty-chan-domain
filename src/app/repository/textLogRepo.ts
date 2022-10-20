import { injectable } from 'inversify';
import TextLog from '../model/text_log';


@injectable()
export class TextLogRepository {
    
	async create(payload: any): Promise<void> {
		const saveData = new TextLog(payload);
		await saveData.save();
	}
    
	async getByUserId(userId: string) {
		const textLog = await TextLog.find({
			userId
		});
		return textLog;
	}

	async count_text_log(userId: string): Promise<number> {
		const textLog = await TextLog.countDocuments({
			userId
		});
		return textLog;
	}

	async update(userId: string) {
		await TextLog.updateOne({ userId }, {
			$inc: { count: 1 }
		});
	}
}