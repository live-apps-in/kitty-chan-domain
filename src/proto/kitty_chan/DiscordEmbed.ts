// Original file: src/proto/kitty_chan.proto

import type {
  DiscordEmbedFooter as _kitty_chan_DiscordEmbedFooter,
  DiscordEmbedFooter__Output as _kitty_chan_DiscordEmbedFooter__Output,
} from '../kitty_chan/DiscordEmbedFooter';
import type {
  DiscordEmbedImage as _kitty_chan_DiscordEmbedImage,
  DiscordEmbedImage__Output as _kitty_chan_DiscordEmbedImage__Output,
} from '../kitty_chan/DiscordEmbedImage';
import type {
  DiscordEmbedThumbnail as _kitty_chan_DiscordEmbedThumbnail,
  DiscordEmbedThumbnail__Output as _kitty_chan_DiscordEmbedThumbnail__Output,
} from '../kitty_chan/DiscordEmbedThumbnail';
import type {
  DiscordEmbedVideo as _kitty_chan_DiscordEmbedVideo,
  DiscordEmbedVideo__Output as _kitty_chan_DiscordEmbedVideo__Output,
} from '../kitty_chan/DiscordEmbedVideo';
import type {
  DiscordEmbedProvider as _kitty_chan_DiscordEmbedProvider,
  DiscordEmbedProvider__Output as _kitty_chan_DiscordEmbedProvider__Output,
} from '../kitty_chan/DiscordEmbedProvider';
import type {
  DiscordEmbedAuthor as _kitty_chan_DiscordEmbedAuthor,
  DiscordEmbedAuthor__Output as _kitty_chan_DiscordEmbedAuthor__Output,
} from '../kitty_chan/DiscordEmbedAuthor';
import type {
  DiscordEmbedField as _kitty_chan_DiscordEmbedField,
  DiscordEmbedField__Output as _kitty_chan_DiscordEmbedField__Output,
} from '../kitty_chan/DiscordEmbedField';

export interface DiscordEmbed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: _kitty_chan_DiscordEmbedFooter | null;
  image?: _kitty_chan_DiscordEmbedImage | null;
  thumbnail?: _kitty_chan_DiscordEmbedThumbnail | null;
  video?: _kitty_chan_DiscordEmbedVideo | null;
  provider?: _kitty_chan_DiscordEmbedProvider | null;
  author?: _kitty_chan_DiscordEmbedAuthor | null;
  fields?: _kitty_chan_DiscordEmbedField[];
}

export interface DiscordEmbed__Output {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: _kitty_chan_DiscordEmbedFooter__Output;
  image?: _kitty_chan_DiscordEmbedImage__Output;
  thumbnail?: _kitty_chan_DiscordEmbedThumbnail__Output;
  video?: _kitty_chan_DiscordEmbedVideo__Output;
  provider?: _kitty_chan_DiscordEmbedProvider__Output;
  author?: _kitty_chan_DiscordEmbedAuthor__Output;
  fields?: _kitty_chan_DiscordEmbedField__Output[];
}
