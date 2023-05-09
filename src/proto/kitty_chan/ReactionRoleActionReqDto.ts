// Original file: src/proto/kitty_chan.proto

import type {
  RolesMapping as _kitty_chan_RolesMapping,
  RolesMapping__Output as _kitty_chan_RolesMapping__Output,
} from '../kitty_chan/RolesMapping';
import type {
  DiscordEmbed as _kitty_chan_DiscordEmbed,
  DiscordEmbed__Output as _kitty_chan_DiscordEmbed__Output,
} from '../kitty_chan/DiscordEmbed';

export interface ReactionRoleActionReqDto {
  name?: string;
  action?: string;
  guildId?: string;
  channelId?: string;
  rolesMapping?: _kitty_chan_RolesMapping[];
  discordEmbedConfig?: _kitty_chan_DiscordEmbed | null;
  reactionRoleMessageRef?: string;
}

export interface ReactionRoleActionReqDto__Output {
  name?: string;
  action?: string;
  guildId?: string;
  channelId?: string;
  rolesMapping?: _kitty_chan_RolesMapping__Output[];
  discordEmbedConfig?: _kitty_chan_DiscordEmbed__Output;
  reactionRoleMessageRef?: string;
}
