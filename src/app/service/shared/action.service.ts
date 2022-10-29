import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { ACTIONS } from '../../enum/action';
import { IGuild } from '../../interface/shared.interface';
import { SharedService } from '../../shared/shared.service';

interface RespondConfig{
    type: string
    guild: IGuild,
    body: any
}

@injectable()
export class ActionService{
	constructor(
        @inject(TYPES.SharedService) private readonly sharedService: SharedService
	) { }
    
	async call(payload: RespondConfig): Promise<void> {
		const config = await new ActionFactory().getActionConfig(payload.type, payload.guild, payload.body);
		console.log(config);
		await this.sharedService.axiosInstance({
			method: config.method,
			route: config.route,
			body: payload.body
		});
	}

}


class ActionFactory{
	async getActionConfig(type: string, guild: IGuild, body: any) {
		const {guildId, userId} = guild;
		const config: any = {};

		switch (type) {
		case ACTIONS.setRole:
			config.route = `/guilds/${guildId}/members/${userId}/roles/${body.roleId}`;
			config.method = 'put';
			break;
         
		default:
			break;
		}
		return config;
	}
}