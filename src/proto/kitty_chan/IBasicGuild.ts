// Original file: src/proto/kitty_chan.proto

import type { Long } from '@grpc/proto-loader';

export interface IBasicGuild {
  guildId?: string;
  guildName?: string;
  guildOwner?: string;
  guildMembersCount?: number | string | Long;
  guildIcon?: string;
}

export interface IBasicGuild__Output {
  guildId?: string;
  guildName?: string;
  guildOwner?: string;
  guildMembersCount?: Long;
  guildIcon?: string;
}
