import { injectable } from 'inversify';
import { IGuild } from '../../common/interface/shared.interface';
import MessageLog from '../../model/message_logs.model';

@injectable()
export class StatsLoggerService {
  async log_message_count(guild: IGuild) {
    ///Message Log
    MessageLog.insertMany({
      userId: guild.userId,
      guildId: guild.guildId,
      channelId: guild.channelId,
      createdAt: new Date(),
    });
    return;
  }
}
