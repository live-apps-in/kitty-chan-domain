// Original file: src/proto/kitty_chan.proto

import type {
  IMessageMentionUsers as _kitty_chan_IMessageMentionUsers,
  IMessageMentionUsers__Output as _kitty_chan_IMessageMentionUsers__Output,
} from '../kitty_chan/IMessageMentionUsers';
import type {
  IMessageMentionRoles as _kitty_chan_IMessageMentionRoles,
  IMessageMentionRoles__Output as _kitty_chan_IMessageMentionRoles__Output,
} from '../kitty_chan/IMessageMentionRoles';

export interface IMessageMentions {
  hasMention?: boolean;
  everyone?: boolean;
  users?: _kitty_chan_IMessageMentionUsers[];
  roles?: _kitty_chan_IMessageMentionRoles[];
}

export interface IMessageMentions__Output {
  hasMention?: boolean;
  everyone?: boolean;
  users?: _kitty_chan_IMessageMentionUsers__Output[];
  roles?: _kitty_chan_IMessageMentionRoles__Output[];
}
