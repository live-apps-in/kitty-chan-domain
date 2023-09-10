import { model, Schema } from 'mongoose';

export interface IPortalRoom {
  guildId: string;
  guildName: string;
  description: string;
  tags: string[];
  guilds: any[];
  createdBy: string;
}

const PortalRoom = new Schema({
  guildId: String,

  guildName: String,

  description: String,

  tags: Array<string>,

  guilds: Array<any>,

  createdBy: String,
});

export default model<IPortalRoom>('portal_room', PortalRoom);
