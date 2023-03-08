// Original file: src/proto/kitty_chan.proto

import type { DiscordEmbedFooter as _kitty_chan_DiscordEmbedFooter, DiscordEmbedFooter__Output as _kitty_chan_DiscordEmbedFooter__Output } from '../kitty_chan/DiscordEmbedFooter';
import type { DiscordEmbedFields as _kitty_chan_DiscordEmbedFields, DiscordEmbedFields__Output as _kitty_chan_DiscordEmbedFields__Output } from '../kitty_chan/DiscordEmbedFields';

export interface DiscordEmbedConfig {
  'title'?: (string);
  'description'?: (string);
  'color'?: (number);
  'footer'?: (_kitty_chan_DiscordEmbedFooter | null);
  'fields'?: (_kitty_chan_DiscordEmbedFields)[];
}

export interface DiscordEmbedConfig__Output {
  'title'?: (string);
  'description'?: (string);
  'color'?: (number);
  'footer'?: (_kitty_chan_DiscordEmbedFooter__Output);
  'fields'?: (_kitty_chan_DiscordEmbedFields__Output)[];
}
