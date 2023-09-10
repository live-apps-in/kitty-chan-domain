import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { IGuild } from '../../common/interface/shared.interface';
import text_log from '../../model/text_log';
import { TextLogRepository } from '../../repository/textLogRepo';
import kitty_chan from '../../model/kitty_chan';
import Guild from '../guild/model/guild.model';
import io from '../../main';
import MessageLog from '../../model/message_logs.model';
@injectable()
export class StatsLoggerService {
  constructor(
    @inject(TYPES.TextLogRepository)
    private readonly textLogRepo: TextLogRepository,
  ) {}

  async log_message_count(guild: IGuild) {
    ///Global Count
    await kitty_chan.updateOne(
      {},
      {
        $inc: { messageCount: 1 },
      },
    );

    ///Update all Listeners
    io.emit('messageCount', { isMessageEvent: true });

    ///Individual Guild
    if (!guild.isBot) {
      await Guild.updateOne(
        { guildId: guild.guildId },
        {
          $inc: { messageCount: 1 },
        },
      );
    }

    ///Message Log
    MessageLog.insertMany({
      userId: guild.userId,
      guildId: guild.guildId,
      channelId: guild.channelId,
      createdAt: new Date(),
    });
    return;
  }

  async text_count_logger(guild: IGuild) {
    // await this.queueService.sendToQueue({name: 'jaga'}, 'logger');
    const getTextLog = await this.textLogRepo.count_text_log(
      guild.userId,
      guild.guildId,
    );
    if (getTextLog === 0) {
      await this.textLogRepo.create({
        userId: guild.userId,
        username: guild.username,
        guildId: guild.guildId,
        channelId: guild.channelId,
        avatar: guild.avatar,
      });
    } else {
      await this.textLogRepo.update(guild.userId, guild.guildId);
      await text_log.updateOne(
        { guildId: guild.guildId, userId: guild.userId },
        {
          avatar: guild.avatar,
        },
      );
    }
  }
}
