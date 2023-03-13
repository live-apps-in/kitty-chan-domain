// Original file: src/proto/kitty_chan.proto

import type { RolesMappingEmoji as _kitty_chan_RolesMappingEmoji, RolesMappingEmoji__Output as _kitty_chan_RolesMappingEmoji__Output } from '../kitty_chan/RolesMappingEmoji';

export interface RolesMapping {
  'name'?: (string);
  'roleId'?: (string);
  'emoji'?: (_kitty_chan_RolesMappingEmoji)[];
}

export interface RolesMapping__Output {
  'name'?: (string);
  'roleId'?: (string);
  'emoji'?: (_kitty_chan_RolesMappingEmoji__Output)[];
}
