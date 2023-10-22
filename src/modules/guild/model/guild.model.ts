import { model, Schema } from 'mongoose';

export interface IGuild {
  name: string;
  guildId: string;
  ownerId: string;
  icon: string;
  membersCount: number;
  staffs: any[];
  tags: string[];
}

const Guild = new Schema({
  name: String,
  guildId: String,
  ownerId: String,
  icon: String,
  membersCount: { type: Number, default: 0 },
  staffs: Array<any>,
  tags: Array<string>,
});

export default model<IGuild>('guilds', Guild);
