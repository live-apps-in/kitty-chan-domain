// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { HelloRequest as _kitty_chan_HelloRequest, HelloRequest__Output as _kitty_chan_HelloRequest__Output } from '../kitty_chan/HelloRequest';
import type { HelloResponse as _kitty_chan_HelloResponse, HelloResponse__Output as _kitty_chan_HelloResponse__Output } from '../kitty_chan/HelloResponse';

export interface HelloWorldClient extends grpc.Client {
  hello(argument: _kitty_chan_HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _kitty_chan_HelloRequest, callback: grpc.requestCallback<_kitty_chan_HelloResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface HelloWorldHandlers extends grpc.UntypedServiceImplementation {
  hello: grpc.handleUnaryCall<_kitty_chan_HelloRequest__Output, _kitty_chan_HelloResponse>;
  
}

export interface HelloWorldDefinition extends grpc.ServiceDefinition {
  hello: MethodDefinition<_kitty_chan_HelloRequest, _kitty_chan_HelloResponse, _kitty_chan_HelloRequest__Output, _kitty_chan_HelloResponse__Output>
}
