import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { IGuild } from '../interface/shared.interface';
import text_log from '../../model/text_log';
import { TextLogRepository } from '../repository/textLogRepo';
import { ViolationRepository } from '../repository/violation.repo';
import kitty_chan from '../../model/kitty_chan';
import server from '../../model/server';
import io from '../../main';
import { QueueService } from '../../shared/queue.service';
@injectable()
export class LoggerService{
	constructor(
        @inject(TYPES.ViolationRepository) private readonly violationRepo: ViolationRepository,
        @inject(TYPES.TextLogRepository) private readonly textLogRepo:TextLogRepository,
        @inject(TYPES.QueueService) private readonly queueService: QueueService,
	) { }

	async log_message_count(guild: IGuild) {
		///Global Count
		await kitty_chan.updateOne({}, {
			$inc: {messageCount: 1}
		});

		///Update all Listeners
		io.emit('messageCount', { isMessageEvent: true });
		
		///Individual Guild
		if (!guild.isBot) {
			await server.updateOne({ guildId: guild.guildId }, {
				$inc: { messageCount: 1 }
			});
		}
		return;
	}

	async text_count_logger(guild: IGuild) {
		await this.queueService.sendToQueue({name: "jaga"}, 'logger')
		const getTextLog = await this.textLogRepo.count_text_log(guild.userId, guild.guildId);
		if (getTextLog === 0) {
			await this.textLogRepo.create({
				userId: guild.userId,
				username: guild.username,
				guildId: guild.guildId,
				channelId: guild.channelId,
				avatar: guild.avatar
			});
		} else {
			await this.textLogRepo.update(guild.userId, guild.guildId);
			await text_log.updateOne({ guildId: guild.guildId, userId: guild.userId }, {
				avatar: guild.avatar
			});
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