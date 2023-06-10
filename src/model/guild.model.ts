import { model, Schema } from 'mongoose';

export interface IGuild {
  name: string;
  guildId: string;
  features: any;
  portal: any;
  welcomer: any;
  logger: any;
  messageCount: number;
}

const Guild = new Schema({
  name: String,
  guildId: String,
  features: {
    type: Object,
    default: {
      welcomer: { channelId: null },
      logger: { channelId: null },
    },
  },
  portal: Object,
  welcomer: Object,
  logger: Object,
  messageCount: { type: Number, bigint: true, default: 0 },
});

export default model<IGuild>('guilds', Guild);
