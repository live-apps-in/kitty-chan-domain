import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ReactionRoles {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  guildId: string;

  @Prop()
  channelId: string;

  @Prop()
  messageId: string;

  @Prop()
  roleEmojiMapping: any[];

  @Prop()
  templateId: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

export const ReactionRolesSchema = SchemaFactory.createForClass(ReactionRoles);
