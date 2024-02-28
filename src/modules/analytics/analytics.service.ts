import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiscordEventsType } from 'src/common/enum/discord-events.enum';
import { IGuild } from 'src/common/interface/guild.interface';
import { MemberLog } from 'src/modules/analytics/models/member_log.model';
import { MessageLog } from 'src/modules/analytics/models/message_log.model';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('message_logs')
    private readonly messageLogModel: Model<MessageLog>,
    @InjectModel('member_logs')
    private readonly memberLogModel: Model<MemberLog>,
  ) {}
  /**Log Message Create, Update, Delete events */
  async log_message(guild: IGuild, event: DiscordEventsType): Promise<void> {
    await this.messageLogModel.create({
      userId: guild.userId,
      guildId: guild.guildId,
      channelId: guild.channelId,
      messageId: guild.messageId,
      event,
    });
  }

  /**Log Member Create, Update, Delete events */
  async log_member(guild: IGuild, event: DiscordEventsType): Promise<void> {
    await this.memberLogModel.create({
      userId: guild.userId,
      guildId: guild.guildId,
      event,
    });
  }
}
