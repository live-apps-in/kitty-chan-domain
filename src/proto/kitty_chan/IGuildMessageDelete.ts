// Original file: src/proto/kitty_chan.proto

export interface IGuildMessageDelete {
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

export interface IGuildMessageDelete__Output {
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
