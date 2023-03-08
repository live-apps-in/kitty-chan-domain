import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { inject } from 'inversify';
import { TYPES } from '../../../../core/inversify.types';
import { ReactionRoleActionReqDto,  } from '../../../../proto/kitty_chan/ReactionRoleActionReqDto';
import { ReactionRoleActionResDto } from '../../../../proto/kitty_chan/ReactionRoleActionResDto';
import { ReactionRoleServiceHandlers } from '../../../../proto/kitty_chan/ReactionRoleService';
import { RolesAPIService } from '../../service/roles/roles.service';

/*
 Roles gRPC Controller 
 */
export class RolesGrpcController implements ReactionRoleServiceHandlers{
  [name: string]: any;

  constructor(
      @inject(TYPES.RolesAPIService) private readonly rolesAPIService: RolesAPIService
  ) { }
  
  async reactionRolesAction(call: ServerUnaryCall<ReactionRoleActionReqDto, ReactionRoleActionResDto>, callback: sendUnaryData<any>) {
  	console.log(call.request);
  	callback(null, { reactionRoleMessageRef: 'test' });
		
  	return;

  	// 	const res = await this.rolesAPIService.reactionRoleFactory({
  	// 	name,
  	// 	guildId: '',
  	// 	channelId,
  	// 	action,
  	// 	rolesMapping,
  	// 	reaction_role_message_ref,
  	// 	discordEmbedConfig
  	// });
    
  }
}