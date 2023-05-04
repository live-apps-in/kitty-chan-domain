// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ReactionRoleActionReqDto as _kitty_chan_ReactionRoleActionReqDto, ReactionRoleActionReqDto__Output as _kitty_chan_ReactionRoleActionReqDto__Output } from '../kitty_chan/ReactionRoleActionReqDto';
import type { ReactionRoleActionResDto as _kitty_chan_ReactionRoleActionResDto, ReactionRoleActionResDto__Output as _kitty_chan_ReactionRoleActionResDto__Output } from '../kitty_chan/ReactionRoleActionResDto';

export interface ReactionRoleServiceClient extends grpc.Client {
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  reactionRolesAction(argument: _kitty_chan_ReactionRoleActionReqDto, callback: grpc.requestCallback<_kitty_chan_ReactionRoleActionResDto__Output>): grpc.ClientUnaryCall;
  
}

export interface ReactionRoleServiceHandlers extends grpc.UntypedServiceImplementation {
  reactionRolesAction: grpc.handleUnaryCall<_kitty_chan_ReactionRoleActionReqDto__Output, _kitty_chan_ReactionRoleActionResDto>;
  
}

export interface ReactionRoleServiceDefinition extends grpc.ServiceDefinition {
  reactionRolesAction: MethodDefinition<_kitty_chan_ReactionRoleActionReqDto, _kitty_chan_ReactionRoleActionResDto, _kitty_chan_ReactionRoleActionReqDto__Output, _kitty_chan_ReactionRoleActionResDto__Output>
}
