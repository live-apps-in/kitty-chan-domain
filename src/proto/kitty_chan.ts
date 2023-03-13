import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GuildServiceClient as _kitty_chan_GuildServiceClient, GuildServiceDefinition as _kitty_chan_GuildServiceDefinition } from './kitty_chan/GuildService';
import type { ReactionRoleServiceClient as _kitty_chan_ReactionRoleServiceClient, ReactionRoleServiceDefinition as _kitty_chan_ReactionRoleServiceDefinition } from './kitty_chan/ReactionRoleService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  kitty_chan: {
    DiscordEmbedConfig: MessageTypeDefinition
    DiscordEmbedFields: MessageTypeDefinition
    DiscordEmbedFooter: MessageTypeDefinition
    GetAllUserGuildReq: MessageTypeDefinition
    GetAllUserGuildRes: MessageTypeDefinition
    GuildService: SubtypeConstructor<typeof grpc.Client, _kitty_chan_GuildServiceClient> & { service: _kitty_chan_GuildServiceDefinition }
    ReactionRoleActionReqDto: MessageTypeDefinition
    ReactionRoleActionResDto: MessageTypeDefinition
    ReactionRoleService: SubtypeConstructor<typeof grpc.Client, _kitty_chan_ReactionRoleServiceClient> & { service: _kitty_chan_ReactionRoleServiceDefinition }
    RolesMapping: MessageTypeDefinition
    RolesMappingEmoji: MessageTypeDefinition
  }
}

