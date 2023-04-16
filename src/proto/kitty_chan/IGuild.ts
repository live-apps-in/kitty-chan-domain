// Original file: src/proto/kitty_chan.proto

export interface IGuild {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  messageContent?: string;
  isBot?: boolean;
}

export interface IGuild__Output {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  messageContent?: string;
  isBot?: boolean;
}
