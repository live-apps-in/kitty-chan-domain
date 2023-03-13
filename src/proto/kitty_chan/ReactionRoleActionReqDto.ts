// Original file: src/proto/kitty_chan.proto

import type { RolesMapping as _kitty_chan_RolesMapping, RolesMapping__Output as _kitty_chan_RolesMapping__Output } from '../kitty_chan/RolesMapping';
import type { DiscordEmbedConfig as _kitty_chan_DiscordEmbedConfig, DiscordEmbedConfig__Output as _kitty_chan_DiscordEmbedConfig__Output } from '../kitty_chan/DiscordEmbedConfig';

export interface ReactionRoleActionReqDto {
  'name'?: (string);
  'action'?: (string);
  'guildId'?: (string);
  'channelId'?: (string);
  'rolesMapping'?: (_kitty_chan_RolesMapping)[];
  'discordEmbedConfig'?: (_kitty_chan_DiscordEmbedConfig | null);
  'reactionRoleMessageRef'?: (string);
}

export interface ReactionRoleActionReqDto__Output {
  'name'?: (string);
  'action'?: (string);
  'guildId'?: (string);
  'channelId'?: (string);
  'rolesMapping'?: (_kitty_chan_RolesMapping__Output)[];
  'discordEmbedConfig'?: (_kitty_chan_DiscordEmbedConfig__Output);
  'reactionRoleMessageRef'?: (string);
}
