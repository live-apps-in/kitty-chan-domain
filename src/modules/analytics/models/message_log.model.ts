import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MessageLog {
  @Prop()
  userId: string;

  @Prop()
  guildId: string;

  @Prop()
  channelId: string;

  @Prop()
  messageId: string;

  @Prop()
  event: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

export const MessageLogSchema = SchemaFactory.createForClass(MessageLog);
