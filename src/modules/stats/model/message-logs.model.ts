import { model, Schema } from 'mongoose';
import { DiscordEventsType } from '../../../common/enum/discord-events.enum';

export interface MessageLog {
  userId: string;
  guildId: string;
  channelId: string;
  messageId: string;
  event: DiscordEventsType;
  createdAt: Date;
}

const MessageLog: Schema = new Schema({
  userId: String,
  guildId: String,
  channelId: String,
  messageId: { type: String, default: null },
  event: String,
  createdAt: Date,
});

export default model<MessageLog>('message_logs', MessageLog);
