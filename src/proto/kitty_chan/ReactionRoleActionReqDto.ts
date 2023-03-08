// Original file: src/proto/kitty_chan.proto

import type { DiscordEmbedConfig as _kitty_chan_DiscordEmbedConfig, DiscordEmbedConfig__Output as _kitty_chan_DiscordEmbedConfig__Output } from '../kitty_chan/DiscordEmbedConfig';

export interface ReactionRoleActionReqDto {
  'name'?: (string);
  'action'?: (string);
  'channelId'?: (string);
  'reactionRoleMessageRef'?: (string);
  'discordEmbedConfig'?: (_kitty_chan_DiscordEmbedConfig | null);
}

export interface ReactionRoleActionReqDto__Output {
  'name'?: (string);
  'action'?: (string);
  'channelId'?: (string);
  'reactionRoleMessageRef'?: (string);
  'discordEmbedConfig'?: (_kitty_chan_DiscordEmbedConfig__Output);
}
