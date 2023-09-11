import { model, Schema } from 'mongoose';

export interface User {
  name: string;
  discordId: string;
  discord: any;
  guilds: string[];
}

const User: Schema = new Schema({
  name: String,
  discordId: String,
  Discord: Object,
  guilds: [String],
});

export default model<User>('users', User);
