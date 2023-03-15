// Original file: src/proto/live_cord.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { NewGuildMemberReq as _live_cord_NewGuildMemberReq, NewGuildMemberReq__Output as _live_cord_NewGuildMemberReq__Output } from '../live_cord/NewGuildMemberReq';
import type { NewGuildMemberRes as _live_cord_NewGuildMemberRes, NewGuildMemberRes__Output as _live_cord_NewGuildMemberRes__Output } from '../live_cord/NewGuildMemberRes';

export interface GuildServiceClient extends grpc.Client {
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, options: grpc.CallOptions, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  syncNewGuildMembers(argument: _live_cord_NewGuildMemberReq, callback: grpc.requestCallback<_live_cord_NewGuildMemberRes__Output>): grpc.ClientUnaryCall;
  
}

export interface GuildServiceHandlers extends grpc.UntypedServiceImplementation {
  syncNewGuildMembers: grpc.handleUnaryCall<_live_cord_NewGuildMemberReq__Output, _live_cord_NewGuildMemberRes>;
  
}

export interface GuildServiceDefinition extends grpc.ServiceDefinition {
  syncNewGuildMembers: MethodDefinition<_live_cord_NewGuildMemberReq, _live_cord_NewGuildMemberRes, _live_cord_NewGuildMemberReq__Output, _live_cord_NewGuildMemberRes__Output>
}
