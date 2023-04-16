import { model, Schema } from 'mongoose';

export interface MessageLog {
  userId: string;
  guildId: string;
  channelId: string;
  createdAt: Date;
}

const MessageLog: Schema = new Schema({
  userId: String,
  username: String,
  guildId: String,
  channelId: String,
  createdAt: Date,
});

export default model<MessageLog>('message_logs', MessageLog);
