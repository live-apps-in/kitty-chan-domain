// Original file: src/proto/kitty_chan.proto

export interface IGuildPresenceActivities {
  name?: string;
  type?: number;
  url?: string;
  details?: string;
  state?: string;
  createdTimestamp?: string;
}

export interface IGuildPresenceActivities__Output {
  name?: string;
  type?: number;
  url?: string;
  details?: string;
  state?: string;
  createdTimestamp?: string;
}
