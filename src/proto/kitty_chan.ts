import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

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
    EventsService: SubtypeConstructor<
      typeof grpc.Client,
      _kitty_chan_EventsServiceClient
    > & { service: _kitty_chan_EventsServiceDefinition };
    IBasicGuild: MessageTypeDefinition;
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
