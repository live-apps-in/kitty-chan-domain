// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { IGuild as _kitty_chan_IGuild, IGuild__Output as _kitty_chan_IGuild__Output } from '../kitty_chan/IGuild';
import type { IMessageReaction as _kitty_chan_IMessageReaction, IMessageReaction__Output as _kitty_chan_IMessageReaction__Output } from '../kitty_chan/IMessageReaction';
import type { NoResponse as _kitty_chan_NoResponse, NoResponse__Output as _kitty_chan_NoResponse__Output } from '../kitty_chan/NoResponse';

export interface EventsServiceClient extends grpc.Client {
  messageCreate(argument: _kitty_chan_IGuild, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageCreate(argument: _kitty_chan_IGuild, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionAdd(argument: _kitty_chan_IMessageReaction, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  messageReactionRemove(argument: _kitty_chan_IMessageReaction, callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EventsServiceHandlers extends grpc.UntypedServiceImplementation {
  messageCreate: grpc.handleUnaryCall<_kitty_chan_IGuild__Output, _kitty_chan_NoResponse>;
  
  messageReactionAdd: grpc.handleUnaryCall<_kitty_chan_IMessageReaction__Output, _kitty_chan_NoResponse>;
  
  messageReactionRemove: grpc.handleUnaryCall<_kitty_chan_IMessageReaction__Output, _kitty_chan_NoResponse>;
  
}

export interface EventsServiceDefinition extends grpc.ServiceDefinition {
  messageCreate: MethodDefinition<_kitty_chan_IGuild, _kitty_chan_NoResponse, _kitty_chan_IGuild__Output, _kitty_chan_NoResponse__Output>
  messageReactionAdd: MethodDefinition<_kitty_chan_IMessageReaction, _kitty_chan_NoResponse, _kitty_chan_IMessageReaction__Output, _kitty_chan_NoResponse__Output>
  messageReactionRemove: MethodDefinition<_kitty_chan_IMessageReaction, _kitty_chan_NoResponse, _kitty_chan_IMessageReaction__Output, _kitty_chan_NoResponse__Output>
}
