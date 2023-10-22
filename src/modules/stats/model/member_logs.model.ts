import { model, Schema } from 'mongoose';
import { DiscordEventsType } from '../../../common/enum/discord_events.enum';

export interface MemberLog {
  userId: string;
  guildId: string;
  event: DiscordEventsType;
  createdAt: Date;
}

const MemberLog: Schema = new Schema({
  userId: String,
  guildId: String,
  event: String,
  createdAt: Date,
});

export default model<MemberLog>('member_logs', MemberLog);
