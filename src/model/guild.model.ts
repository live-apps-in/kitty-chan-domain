import { model, Schema } from 'mongoose';

export interface IGuild {
  name: string;
  guildId: string;
  features: any;
  portal: any;
  welcomer: any;
  messageCount: number;
}

const Guild = new Schema({
  name: String,
  guildId: String,
  features: {
    type: Object,
    default: {
      strongLanguage: false,
      hindi: false,
      valorant_find_players: false,
      welcome_message: false,
    },
  },
  portal: Object,
  welcomer: Object,
  messageCount: { type: Number, bigint: true, default: 0 },
});

export default model<IGuild>('guilds', Guild);
