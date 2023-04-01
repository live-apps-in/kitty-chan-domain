// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { GetAllUserGuildReq as _kitty_chan_GetAllUserGuildReq, GetAllUserGuildReq__Output as _kitty_chan_GetAllUserGuildReq__Output } from '../kitty_chan/GetAllUserGuildReq';
import type { GetAllUserGuildRes as _kitty_chan_GetAllUserGuildRes, GetAllUserGuildRes__Output as _kitty_chan_GetAllUserGuildRes__Output } from '../kitty_chan/GetAllUserGuildRes';

export interface GuildServiceClient extends grpc.Client {
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  getAllUserGuilds(argument: _kitty_chan_GetAllUserGuildReq, callback: grpc.requestCallback<_kitty_chan_GetAllUserGuildRes__Output>): grpc.ClientUnaryCall;
  
}

export interface GuildServiceHandlers extends grpc.UntypedServiceImplementation {
  getAllUserGuilds: grpc.handleUnaryCall<_kitty_chan_GetAllUserGuildReq__Output, _kitty_chan_GetAllUserGuildRes>;
  
}

export interface GuildServiceDefinition extends grpc.ServiceDefinition {
  getAllUserGuilds: MethodDefinition<_kitty_chan_GetAllUserGuildReq, _kitty_chan_GetAllUserGuildRes, _kitty_chan_GetAllUserGuildReq__Output, _kitty_chan_GetAllUserGuildRes__Output>
}
