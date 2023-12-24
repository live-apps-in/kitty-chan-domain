// Original file: src/proto/kitty_chan.proto

import type {
  IMessageMentions as _kitty_chan_IMessageMentions,
  IMessageMentions__Output as _kitty_chan_IMessageMentions__Output,
} from '../kitty_chan/IMessageMentions';
import type {
  IMessageAttachments as _kitty_chan_IMessageAttachments,
  IMessageAttachments__Output as _kitty_chan_IMessageAttachments__Output,
} from '../kitty_chan/IMessageAttachments';

export interface IGuildMessage {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  plainMessage?: string;
  mentions?: _kitty_chan_IMessageMentions | null;
  attachments?: _kitty_chan_IMessageAttachments[];
  isBot?: boolean;
}

export interface IGuildMessage__Output {
  guildId?: string;
  guildName?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  plainMessage?: string;
  mentions?: _kitty_chan_IMessageMentions__Output;
  attachments?: _kitty_chan_IMessageAttachments__Output[];
  isBot?: boolean;
}
