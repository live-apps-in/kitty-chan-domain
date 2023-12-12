import { injectable } from 'inversify';
import { IGuild } from '../../common/interface/shared.interface';
import MessageLog from './model/message-logs.model';
import { DiscordEventsType } from '../../common/enum/discord-events.enum';
import MemberLog from './model/member-logs.model';

@injectable()
export class GuildStatsService {
  /**Log Message Create, Update, Delete events */
  async log_message(guild: IGuild, event: DiscordEventsType) {
    await MessageLog.insertMany({
      userId: guild.userId,
      guildId: guild.guildId,
      channelId: guild.channelId,
      messageId: guild.messageId,
      event,
      createdAt: new Date(),
    });

    return;
  }

  /**Log Member Create, Update, Delete events */
  async log_member(guild: IGuild, event: DiscordEventsType) {
    await MemberLog.insertMany({
      userId: guild.userId,
      guildId: guild.guildId,
      event,
      createdAt: new Date(),
    });

    return;
  }
}
