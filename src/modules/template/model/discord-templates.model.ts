import { model, Schema } from 'mongoose';

export interface IDiscordTemplates {
  type: string;
  target: string;
  content: string;
  embed: any;
}

const DiscordTemplates: Schema = new Schema({
  type: String,
  target: String,
  content: String,
  embed: Object,
});

export default model<IDiscordTemplates>('discord_templates', DiscordTemplates);
