import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { IGuild } from '../interface/shared.interface';
import { TextLogRepository } from '../repository/textLogRepo';
import { ViolationRepository } from '../repository/violation.repo';

@injectable()
export class LoggerService{
	constructor(
        @inject(TYPES.ViolationRepository) private readonly violationRepo: ViolationRepository,
        @inject(TYPES.TextLogRepository) private readonly textLogRepo:TextLogRepository,
	) { }

	async text_count_logger(guild: IGuild) {
		const getTextLog = await this.textLogRepo.count_text_log(guild.userId, guild.guildId);
		if (getTextLog === 0) {
			await this.textLogRepo.create({
				userId: guild.userId,
				username: guild.username,
				guildId: guild.guildId,
				channelId: guild.channelId
			});
		} else {
			await this.textLogRepo.update(guild.userId, guild.guildId);
		}
	}
	async violation_logger(guild: IGuild, type: string) {
		const getViolation = await this.violationRepo.countViolationByType(guild.userId,guild.guildId, type);
		if (getViolation === 0) {
			await this.violationRepo.create({
				userId: guild.userId,
				username: guild.username,
				guildId: guild.guildId, type: type,
				channelId: guild.channelId
			});
		} else {
			await this.violationRepo.update(guild.userId, guild.guildId, type);
		}
	}
}