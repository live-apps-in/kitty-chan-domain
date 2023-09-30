import { model, Schema } from 'mongoose';

export interface IGuild {
  name: string;
  guildId: string;
  ownerId: string;
  staffs: any[];
  icon: string;
  tags: string[];
}

const Guild = new Schema({
  name: String,
  guildId: String,
  ownerId: String,
  staffs: Array<any>,
  icon: String,
  tags: Array<string>,
});

export default model<IGuild>('guilds', Guild);
