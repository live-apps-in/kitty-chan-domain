// Original file: src/proto/kitty_chan.proto

import type {
  IEmoji as _kitty_chan_IEmoji,
  IEmoji__Output as _kitty_chan_IEmoji__Output,
} from '../kitty_chan/IEmoji';

export interface IMessageReaction {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  plainText?: string;
  isBot?: boolean;
  emoji?: _kitty_chan_IEmoji | null;
}

export interface IMessageReaction__Output {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  plainText?: string;
  isBot?: boolean;
  emoji?: _kitty_chan_IEmoji__Output;
}
