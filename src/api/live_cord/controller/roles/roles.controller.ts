import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPatch } from 'inversify-express-utils';
import { Req } from '../../../../core/custom_types';
import { TYPES } from '../../../../core/inversify.types';
import { InternalAuthGuard } from '../../../auth/guards/InternalAuthGuard';
import { RolesAPIService } from '../../service/roles/roles.service';

@controller('/live_cord')
export class RolesController{
	constructor(
        @inject(TYPES.RolesAPIService) private readonly rolesAPIService: RolesAPIService
	) { }

    /**
     * Reaction Roles
     */
    @httpPatch('/guild/reaction_roles/:action', InternalAuthGuard)
	async reactionRoleAction(req: Req) {
		const { action } = req.params;
		const { guildId } = req.userData;
		const { name, channelId, rolesMapping, reactionRoleMessageRef, discordEmbedConfig } = req.body;
        
		return this.rolesAPIService.reactionRoleFactory({
			name,
			guildId,
			channelId,
			action,
			rolesMapping,
			reactionRoleMessageRef,
			discordEmbedConfig
		});
	}
    
}