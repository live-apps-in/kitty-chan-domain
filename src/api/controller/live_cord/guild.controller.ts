import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Req } from '../../../core/custom_types';
import { TYPES } from '../../../core/inversify.types';
import { InternalAuthGuard } from '../../auth/guards/InternalAuthGuard';
import { GuildService } from '../../service/live_cord/guild.service';


@controller('/live_cord/guild')
export class GuildController {
	constructor(
        @inject(TYPES.GuildService) private readonly guildService: GuildService
	) { }
    
    //**Features**//
    @httpPost('/features', InternalAuthGuard)
	async view_guild_features(req: Req) {
		const { discord_id } = req.userData;
		const { guildId } = req.body;

		return await this.guildService.fetch_guild_profile(discord_id, guildId);
        
	}
}