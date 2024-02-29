import { DiscordEmbeds } from '@live-apps/discord';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class DiscordTemplate {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  target: string;

  @Prop()
  content: string;

  @Prop({ type: Object })
  embed: DiscordEmbeds;

  @Prop()
  guildId: string;

  @Prop()
  userId: Types.ObjectId;

  @Prop({ default: false })
  community: boolean;

  @Prop({ default: null })
  forkedFrom: Types.ObjectId;
}

export const DiscordTemplateSchema =
  SchemaFactory.createForClass(DiscordTemplate);
