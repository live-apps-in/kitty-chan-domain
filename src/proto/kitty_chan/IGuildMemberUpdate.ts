// Original file: src/proto/kitty_chan.proto

export interface IGuildMemberUpdate {
  guildId?: string;
  userId?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles?: string[];
  isBot?: boolean;
}

export interface IGuildMemberUpdate__Output {
  guildId?: string;
  userId?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles?: string[];
  isBot?: boolean;
}
