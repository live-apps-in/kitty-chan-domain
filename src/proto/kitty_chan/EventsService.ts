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
  IGuildMemberUpdate as _kitty_chan_IGuildMemberUpdate,
  IGuildMemberUpdate__Output as _kitty_chan_IGuildMemberUpdate__Output,
} from '../kitty_chan/IGuildMemberUpdate';
import type {
  IGuildMessage as _kitty_chan_IGuildMessage,
  IGuildMessage__Output as _kitty_chan_IGuildMessage__Output,
} from '../kitty_chan/IGuildMessage';
import type {
  IGuildMessageDelete as _kitty_chan_IGuildMessageDelete,
  IGuildMessageDelete__Output as _kitty_chan_IGuildMessageDelete__Output,
} from '../kitty_chan/IGuildMessageDelete';
import type {
  IGuildMessageUpdate as _kitty_chan_IGuildMessageUpdate,
  IGuildMessageUpdate__Output as _kitty_chan_IGuildMessageUpdate__Output,
} from '../kitty_chan/IGuildMessageUpdate';
import type {
  IGuildPresenceUpdate as _kitty_chan_IGuildPresenceUpdate,
  IGuildPresenceUpdate__Output as _kitty_chan_IGuildPresenceUpdate__Output,
} from '../kitty_chan/IGuildPresenceUpdate';
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

  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildMemberUpdate(
    argument: _kitty_chan_IGuildMemberUpdate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildPresenceUpdate(
    argument: _kitty_chan_IGuildPresenceUpdate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;

  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  guildUpdate(
    argument: _kitty_chan_IBasicGuild,
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

  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageDelete(
    argument: _kitty_chan_IGuildMessageDelete,
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

  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_kitty_chan_NoResponse__Output>,
  ): grpc.ClientUnaryCall;
  messageUpdate(
    argument: _kitty_chan_IGuildMessageUpdate,
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

  guildMemberUpdate: grpc.handleUnaryCall<
    _kitty_chan_IGuildMemberUpdate__Output,
    _kitty_chan_NoResponse
  >;

  guildPresenceUpdate: grpc.handleUnaryCall<
    _kitty_chan_IGuildPresenceUpdate__Output,
    _kitty_chan_NoResponse
  >;

  guildUpdate: grpc.handleUnaryCall<
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse
  >;

  messageCreate: grpc.handleUnaryCall<
    _kitty_chan_IGuildMessage__Output,
    _kitty_chan_NoResponse
  >;

  messageDelete: grpc.handleUnaryCall<
    _kitty_chan_IGuildMessageDelete__Output,
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

  messageUpdate: grpc.handleUnaryCall<
    _kitty_chan_IGuildMessageUpdate__Output,
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
  guildMemberUpdate: MethodDefinition<
    _kitty_chan_IGuildMemberUpdate,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMemberUpdate__Output,
    _kitty_chan_NoResponse__Output
  >;
  guildPresenceUpdate: MethodDefinition<
    _kitty_chan_IGuildPresenceUpdate,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildPresenceUpdate__Output,
    _kitty_chan_NoResponse__Output
  >;
  guildUpdate: MethodDefinition<
    _kitty_chan_IBasicGuild,
    _kitty_chan_NoResponse,
    _kitty_chan_IBasicGuild__Output,
    _kitty_chan_NoResponse__Output
  >;
  messageCreate: MethodDefinition<
    _kitty_chan_IGuildMessage,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMessage__Output,
    _kitty_chan_NoResponse__Output
  >;
  messageDelete: MethodDefinition<
    _kitty_chan_IGuildMessageDelete,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMessageDelete__Output,
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
  messageUpdate: MethodDefinition<
    _kitty_chan_IGuildMessageUpdate,
    _kitty_chan_NoResponse,
    _kitty_chan_IGuildMessageUpdate__Output,
    _kitty_chan_NoResponse__Output
  >;
}
