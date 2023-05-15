// Original file: src/proto/live_cord.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  GetGuildReq as _live_cord_GetGuildReq,
  GetGuildReq__Output as _live_cord_GetGuildReq__Output,
} from '../live_cord/GetGuildReq';
import type {
  GetGuildRes as _live_cord_GetGuildRes,
  GetGuildRes__Output as _live_cord_GetGuildRes__Output,
} from '../live_cord/GetGuildRes';
import type {
  GuildMemberReq as _live_cord_GuildMemberReq,
  GuildMemberReq__Output as _live_cord_GuildMemberReq__Output,
} from '../live_cord/GuildMemberReq';
import type {
  GuildMemberRes as _live_cord_GuildMemberRes,
  GuildMemberRes__Output as _live_cord_GuildMemberRes__Output,
} from '../live_cord/GuildMemberRes';

export interface GuildServiceClient extends grpc.Client {
  getGuildById(
    argument: _live_cord_GetGuildReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;
  getGuildById(
    argument: _live_cord_GetGuildReq,
    callback: grpc.requestCallback<_live_cord_GetGuildRes__Output>,
  ): grpc.ClientUnaryCall;

  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncCreateGuildMember(
    argument: _live_cord_GuildMemberReq,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;

  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
  syncRemoveGuildMember(
    argument: _live_cord_GuildMemberReq,
    callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>,
  ): grpc.ClientUnaryCall;
}

export interface GuildServiceHandlers
  extends grpc.UntypedServiceImplementation {
  getGuildById: grpc.handleUnaryCall<
    _live_cord_GetGuildReq__Output,
    _live_cord_GetGuildRes
  >;

  syncCreateGuildMember: grpc.handleUnaryCall<
    _live_cord_GuildMemberReq__Output,
    _live_cord_GuildMemberRes
  >;

  syncRemoveGuildMember: grpc.handleUnaryCall<
    _live_cord_GuildMemberReq__Output,
    _live_cord_GuildMemberRes
  >;
}

export interface GuildServiceDefinition extends grpc.ServiceDefinition {
  getGuildById: MethodDefinition<
    _live_cord_GetGuildReq,
    _live_cord_GetGuildRes,
    _live_cord_GetGuildReq__Output,
    _live_cord_GetGuildRes__Output
  >;
  syncCreateGuildMember: MethodDefinition<
    _live_cord_GuildMemberReq,
    _live_cord_GuildMemberRes,
    _live_cord_GuildMemberReq__Output,
    _live_cord_GuildMemberRes__Output
  >;
  syncRemoveGuildMember: MethodDefinition<
    _live_cord_GuildMemberReq,
    _live_cord_GuildMemberRes,
    _live_cord_GuildMemberReq__Output,
    _live_cord_GuildMemberRes__Output
  >;
}
