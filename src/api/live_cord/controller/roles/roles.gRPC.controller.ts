import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { inject } from 'inversify';
import { TYPES } from '../../../../core/inversify.types';
import { ReactionRoleActionReqDto } from '../../../../proto/kitty_chan/ReactionRoleActionReqDto';
import { ReactionRoleActionResDto } from '../../../../proto/kitty_chan/ReactionRoleActionResDto';
import { ReactionRoleServiceHandlers } from '../../../../proto/kitty_chan/ReactionRoleService';
import { RolesAPIService } from '../../service/roles/roles.service';
import { DiscordEmbeds } from '@live-apps/discord';
/*
 Roles gRPC Controller 
 */
export class RolesGrpcController implements ReactionRoleServiceHandlers {
  [name: string]: any;

  constructor(
    @inject(TYPES.RolesAPIService)
    private readonly rolesAPIService: RolesAPIService,
  ) {}

  async reactionRolesAction(
    call: ServerUnaryCall<ReactionRoleActionReqDto, ReactionRoleActionResDto>,
    callback: sendUnaryData<any>,
  ) {
    const {
      name,
      channelId,
      guildId,
      action,
      rolesMapping,
      reactionRoleMessageRef,
      discordEmbedConfig,
    } = call.request;

    /**proto 3 doesn't support required field
     * So re-assigning to a new interface
     */
    const discordEmbeds = discordEmbedConfig as DiscordEmbeds;

    const res = await this.rolesAPIService.reactionRoleFactory({
      name,
      guildId,
      channelId,
      action,
      rolesMapping,
      reactionRoleMessageRef,
      discordEmbedConfig: discordEmbeds,
    });

    return callback(null, { ...res });
  }
}
