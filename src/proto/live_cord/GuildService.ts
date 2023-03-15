// Original file: src/proto/live_cord.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { GuildMemberReq as _live_cord_GuildMemberReq, GuildMemberReq__Output as _live_cord_GuildMemberReq__Output } from '../live_cord/GuildMemberReq';
import type { GuildMemberRes as _live_cord_GuildMemberRes, GuildMemberRes__Output as _live_cord_GuildMemberRes__Output } from '../live_cord/GuildMemberRes';

export interface GuildServiceClient extends grpc.Client {
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncCreateGuildMember(argument: _live_cord_GuildMemberReq, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncRemoveGuildMember(argument: _live_cord_GuildMemberReq, callback: grpc.requestCallback<_live_cord_GuildMemberRes__Output>): grpc.ClientUnaryCall;
  
}

export interface GuildServiceHandlers extends grpc.UntypedServiceImplementation {
  syncCreateGuildMember: grpc.handleUnaryCall<_live_cord_GuildMemberReq__Output, _live_cord_GuildMemberRes>;
  
  syncRemoveGuildMember: grpc.handleUnaryCall<_live_cord_GuildMemberReq__Output, _live_cord_GuildMemberRes>;
  
}

export interface GuildServiceDefinition extends grpc.ServiceDefinition {
  syncCreateGuildMember: MethodDefinition<_live_cord_GuildMemberReq, _live_cord_GuildMemberRes, _live_cord_GuildMemberReq__Output, _live_cord_GuildMemberRes__Output>
  syncRemoveGuildMember: MethodDefinition<_live_cord_GuildMemberReq, _live_cord_GuildMemberRes, _live_cord_GuildMemberReq__Output, _live_cord_GuildMemberRes__Output>
}
