// Original file: src/proto/kitty_chan.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  IBasicGuild as _kitty_chan_IBasicGuild,
  IBasicGuild__Output as _kitty_chan_IBasicGuild__Output,
} from '../kitty_chan/IBasicGuild';
import type {
  IGuildMember as _kitty_chan_IGuildMember,
  IGuildMember__Output as _kitty_chan_IGuildMember__Output,
} from '../kitty_chan/IGuildMember';
import type {
  IGuildMessage as _kitty_chan_IGuildMessage,
  IGuildMessage__Output as _kitty_chan_IGuildMessage__Output,
} from '../kitty_chan/IGuildMessage';
import type {
  IMessageReaction as _kitty_chan_IMessageReaction,
  IMessageReaction__Output as _kitty_chan_IMessageReaction__Output,
} from '../kitty_chan/IMessageReaction';
import type {
  NoResponse as _kitty_chan_NoResponse,
  NoResponse__Output as _kitty_chan_NoResponse__Output,
} from '../kitty_chan/NoResponse';

export interface EventsServiceClient extends grpc.Client {
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildCreate(
    argument: _kitty_chan_IBasicGuild,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildDelete(
    argument: _kitty_chan_IBasicGuild,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberAdd(
    argument: _kitty_chan_IGuildMember,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberRemove(
    argument: _kitty_chan_IGuildMember,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageCreate(
    argument: _kitty_chan_IGuildMessage,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionAdd(
    argument: _kitty_chan_IMessageReaction,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageReactionRemove(
    argument: _kitty_chan_IMessageReaction,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface EventsServiceHandlers
  extends grpc.UntypedServiceImplementation {
  guildCreate: grpc.handleUnaryCall<
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse
  >;

  guildDelete: grpc.handleUnaryCall<
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse
  >;

  guildMemberAdd: grpc.handleUnaryCall<
    _kitty_chan_IGuildMember__Output,
    _kitty_chan_NoResponse
  >;

  guildMemberRemove: grpc.handleUnaryCall<
    _kitty_chan_IGuildMember__Output,
    _kitty_chan_NoResponse
  >;

  messageCreate: grpc.handleUnaryCall<
    _kitty_chan_IGuildMessage__Output,
    _kitty_chan_NoResponse
  >;

  messageReactionAdd: grpc.handleUnaryCall<
    _kitty_chan_IMessageReaction__Output,
    _kitty_chan_NoResponse
  >;

  messageReactionRemove: grpc.handleUnaryCall<
    _kitty_chan_IMessageReaction__Output,
    _kitty_chan_NoResponse
  >;
}

export interface EventsServiceDefinition extends grpc.ServiceDefinition {
  guildCreate: MethodDefinition<
    _kitty_chan_IBasicGuild,
    _kitty_chan_NoResponse,
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse__Output
  >;
  guildDelete: MethodDefinition<
    _kitty_chan_IBasicGuild,
    _kitty_chan_NoResponse,
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse__Output
  >;
  guildMemberAdd: MethodDefinition<
    _kitty_chan_IGuildMember,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMember__Output,
    _kitty_chan_NoResponse__Output
  >;
  guildMemberRemove: MethodDefinition<
    _kitty_chan_IGuildMember,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMember__Output,
    _kitty_chan_NoResponse__Output
  >;
  messageCreate: MethodDefinition<
    _kitty_chan_IGuildMessage,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMessage__Output,
    _kitty_chan_NoResponse__Output
  >;
  messageReactionAdd: MethodDefinition<
    _kitty_chan_IMessageReaction,
    _kitty_chan_NoResponse,
    _kitty_chan_IMessageReaction__Output,
    _kitty_chan_NoResponse__Output
  >;
  messageReactionRemove: MethodDefinition<
    _kitty_chan_IMessageReaction,
    _kitty_chan_NoResponse,
    _kitty_chan_IMessageReaction__Output,
    _kitty_chan_NoResponse__Output
  >;
}
