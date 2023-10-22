import { model, Schema } from 'mongoose';

export interface User {
  name: string;
  discordId: string;
  discord: any;
  guilds: string[];
  activityStatus: string;
  activities: any[];
}

const User: Schema = new Schema({
  name: String,
  discordId: String,
  Discord: Object,
  guilds: [String],
  activityStatus: String,
  activities: Array<any>,
});

export default model<User>('users', User);
