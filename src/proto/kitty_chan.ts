import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  CronServiceClient as _kitty_chan_CronServiceClient,
  CronServiceDefinition as _kitty_chan_CronServiceDefinition,
} from './kitty_chan/CronService';
import type {
  EventsServiceClient as _kitty_chan_EventsServiceClient,
  EventsServiceDefinition as _kitty_chan_EventsServiceDefinition,
} from './kitty_chan/EventsService';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  kitty_chan: {
    CronService: SubtypeConstructor<
      typeof grpc.Client,
      _kitty_chan_CronServiceClient
    > & { service: _kitty_chan_CronServiceDefinition };
    EventsService: SubtypeConstructor<
      typeof grpc.Client,
      _kitty_chan_EventsServiceClient
    > & { service: _kitty_chan_EventsServiceDefinition };
    IBasicGuild: MessageTypeDefinition;
    ICronCreate: MessageTypeDefinition;
    IEmoji: MessageTypeDefinition;
    IGuildMember: MessageTypeDefinition;
    IGuildMemberUpdate: MessageTypeDefinition;
    IGuildMessage: MessageTypeDefinition;
    IGuildMessageDelete: MessageTypeDefinition;
    IGuildMessageUpdate: MessageTypeDefinition;
    IGuildPresenceActivities: MessageTypeDefinition;
    IGuildPresenceUpdate: MessageTypeDefinition;
    IMessageAttachments: MessageTypeDefinition;
    IMessageMentionRoles: MessageTypeDefinition;
    IMessageMentionUsers: MessageTypeDefinition;
    IMessageMentions: MessageTypeDefinition;
    IMessageReaction: MessageTypeDefinition;
    NoResponse: MessageTypeDefinition;
  };
}
