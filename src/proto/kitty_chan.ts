import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ReactionRoleServiceClient as _kitty_chan_ReactionRoleServiceClient, ReactionRoleServiceDefinition as _kitty_chan_ReactionRoleServiceDefinition } from './kitty_chan/ReactionRoleService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  kitty_chan: {
    ReactionRoleActionReqDto: MessageTypeDefinition
    ReactionRoleActionResDto: MessageTypeDefinition
    ReactionRoleService: SubtypeConstructor<typeof grpc.Client, _kitty_chan_ReactionRoleServiceClient> & { service: _kitty_chan_ReactionRoleServiceDefinition }
  }
}

