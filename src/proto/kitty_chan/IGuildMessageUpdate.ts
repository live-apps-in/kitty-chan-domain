// Original file: src/proto/kitty_chan.proto

export interface IGuildMessageUpdate {
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

export interface IGuildMessageUpdate__Output {
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
