// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  ICronCreate as _kitty_chan_ICronCreate,
  ICronCreate__Output as _kitty_chan_ICronCreate__Output,
} from '../kitty_chan/ICronCreate';
import type {
  NoResponse as _kitty_chan_NoResponse,
  NoResponse__Output as _kitty_chan_NoResponse__Output,
} from '../kitty_chan/NoResponse';

export interface CronServiceClient extends grpc.Client {
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  cronCreate(
    argument: _kitty_chan_ICronCreate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface CronServiceHandlers extends grpc.UntypedServiceImplementation {
  cronCreate: grpc.handleUnaryCall<
    _kitty_chan_ICronCreate__Output,
    _kitty_chan_NoResponse
  >;
}

export interface CronServiceDefinition extends grpc.ServiceDefinition {
  cronCreate: MethodDefinition<
    _kitty_chan_ICronCreate,
    _kitty_chan_NoResponse,
    _kitty_chan_ICronCreate__Output,
    _kitty_chan_NoResponse__Output
  >;
}
