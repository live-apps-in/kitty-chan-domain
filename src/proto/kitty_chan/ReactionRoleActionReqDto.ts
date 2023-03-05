// Original file: src/proto/kitty_chan.proto

import type { Any as _google_protobuf_Any, Any__Output as _google_protobuf_Any__Output } from '../google/protobuf/Any';

export interface ReactionRoleActionReqDto {
  'name'?: (string);
  'channelId'?: (string);
  'action'?: (string);
  'rolesMapping'?: (_google_protobuf_Any)[];
  'reaction_role_message_ref'?: (string);
  'discordEmbedConfig'?: (string);
}

export interface ReactionRoleActionReqDto__Output {
  'name'?: (string);
  'channelId'?: (string);
  'action'?: (string);
  'rolesMapping'?: (_google_protobuf_Any__Output)[];
  'reaction_role_message_ref'?: (string);
  'discordEmbedConfig'?: (string);
}
