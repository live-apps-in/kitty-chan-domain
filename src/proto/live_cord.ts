import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  GuildServiceClient as _live_cord_GuildServiceClient,
  GuildServiceDefinition as _live_cord_GuildServiceDefinition,
} from './live_cord/GuildService';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  live_cord: {
    GetGuildReq: MessageTypeDefinition;
    GetGuildRes: MessageTypeDefinition;
    GuildMemberReq: MessageTypeDefinition;
    GuildMemberRes: MessageTypeDefinition;
    GuildService: SubtypeConstructor<
      typeof grpc.Client,
      _live_cord_GuildServiceClient
    > & { service: _live_cord_GuildServiceDefinition };
  };
}
