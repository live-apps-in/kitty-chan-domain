// Original file: src/proto/kitty_chan.proto

import type {
  IGuildPresenceActivities as _kitty_chan_IGuildPresenceActivities,
  IGuildPresenceActivities__Output as _kitty_chan_IGuildPresenceActivities__Output,
} from '../kitty_chan/IGuildPresenceActivities';

export interface IGuildPresenceUpdate {
  guildId?: string;
  userId?: string;
  status?: string;
  activities?: _kitty_chan_IGuildPresenceActivities[];
}

export interface IGuildPresenceUpdate__Output {
  guildId?: string;
  userId?: string;
  status?: string;
  activities?: _kitty_chan_IGuildPresenceActivities__Output[];
}
