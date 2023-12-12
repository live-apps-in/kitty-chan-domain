import { model, Schema } from 'mongoose';

export interface IReactionRole {
  name: string;
  guildId: string;
  channelId: string;
  roleEmojiMapping: any[];
  messageId: string;
}

const ReactionRolesSchema = new Schema({
  name: String,
  guildId: String,
  channelId: String,
  roleEmojiMapping: Array<any>,
  messageId: String,
});

export default model<IReactionRole>('reaction_roles', ReactionRolesSchema);
