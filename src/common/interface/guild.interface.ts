import { Message } from 'discord.js';

export interface IGuild {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  plainMessage?: string;
  isBot?: boolean;
  payload?: Message;
  featureFlag?: any;
}

export interface IBasicGuild {
  guildId?: string;
  guildName?: string;
  guildOwner?: string;
  guildMembersCount?: number;
  guildIcon?: string;
}

/**Message */
export interface IGuildMessage {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  plainMessage?: string;
  mentions?: IMessageMentions;
  attachments?: IMessageAttachments[];
  isBot?: boolean;
  createdAt?: Date;
}

/**Guild Message Update */
export interface IMessageUpdate {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  oldMessage?: string;
  newMessage?: string;
  createdAt?: string;
  editedAt?: string;
  isBot?: boolean;
}

/**Guild Message Delete */
export interface IMessageDelete {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  message?: string;
  createdAt?: string;
  editedAt?: string;
  isBot?: boolean;
}

export interface IMessageMentions {
  hasMention?: boolean;
  everyone?: boolean;
  users?: IMessageMentionsUser[];
  roles?: IMessageMentionsRole[];
}

export interface IMessageMentionsUser {
  userId?: string;
}
export interface IMessageMentionsRole {
  roleId?: string;
}

export interface IMessageAttachments {
  name: string;
  id: string;
  size: number;
  url: string;
  proxyURL: string;
  height: number;
  width: number;
  contentType: string;
  description: string;
  ephemeral: boolean;
}

/**Discord Message Reaction */
export interface IMessageReaction {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  plainMessage?: string;
  isBot?: boolean;
  emoji?: IEmoji;
  payload?: Message;
  createdAt?: Date;
}

export interface IGuildMember {
  guildId?: string;
  guildName?: string;
  userId?: string;
  userName?: string;
  createdAt?: Date;
}
export interface IGuildMemberUpdate {
  guildId?: string;
  userId?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles?: string[];
  isBot?: boolean;
  updatedAt?: Date;
}

/**Discord Emoji */
export interface IEmoji {
  name: string;
  id: string;
  animated: boolean;
  createdAt?: Date;
}

/**Guild Presence */
export interface IGuildPresence {
  guildId: string;
  userId: string;
  status: string;
  activities: IGuildPresenceActivities[];
}

export interface IGuildPresenceActivities {
  name: string;
  type: number;
  url: string;
  details: string;
  state: string;
  createdTimestamp: string;
}
