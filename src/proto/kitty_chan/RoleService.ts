// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  Any as _google_protobuf_Any,
  Any__Output as _google_protobuf_Any__Output,
} from '../google/protobuf/Any';
import type {
  ReactionRoleActionReqDto as _kitty_chan_ReactionRoleActionReqDto,
  ReactionRoleActionReqDto__Output as _kitty_chan_ReactionRoleActionReqDto__Output,
} from '../kitty_chan/ReactionRoleActionReqDto';

export interface RoleServiceClient extends grpc.Client {
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
  reactionRolesAction(
    argument: _kitty_chan_ReactionRoleActionReqDto,
    callback: grpc.requestCallback<_google_protobuf_Any__Output>,
  ): grpc.ClientUnaryCall;
}

export interface RoleServiceHandlers extends grpc.UntypedServiceImplementation {
  reactionRolesAction: grpc.handleUnaryCall<
    _kitty_chan_ReactionRoleActionReqDto,
    _google_protobuf_Any
  >;
}

export interface RoleServiceDefinition extends grpc.ServiceDefinition {
  reactionRolesAction: MethodDefinition<
    _kitty_chan_ReactionRoleActionReqDto,
    _google_protobuf_Any,
    _kitty_chan_ReactionRoleActionReqDto__Output,
    _google_protobuf_Any__Output
  >;
}
