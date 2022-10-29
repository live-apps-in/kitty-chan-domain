import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { REPLY } from '../../enum/reply';
import { IGuild } from '../../interface/shared.interface';
import { SharedService } from '../../shared/shared.service';

interface RespondConfig{
    type: string
    guild: IGuild,
    body: any
}

@injectable()
export class ResponseService{
	constructor(
        @inject(TYPES.SharedService) private readonly sharedService: SharedService
	) { }
    
	async respond(payload: RespondConfig): Promise<void> {
		const config = await new ResponseFactory().getResponseConfig(payload.type, payload.guild, payload.body);
		await this.sharedService.axiosInstance({
			method: config.method,
			route: config.route,
			body: payload.body
		});
	}

}


class ResponseFactory{
	async getResponseConfig(type: string, guild: IGuild, body: any) {
		const {channelId, messageId} = guild;
		const config: any = {};

		switch (type) {
		case REPLY.sendMessage:
			config.route = `/channels/${channelId}/messages`;
			config.method = 'post';
			break;
             
		case REPLY.addReaction:
			config.route = `/channels/${channelId}/messages/${messageId}/reactions/${body.emoji}/@me`;
			config.method = 'put';
			break;
			
		case REPLY.replyMessage:
			config.route = `/channels/${channelId}/messages`;
			config.method = 'post';
			break;
         
		default:
			break;
		}
		return config;
	}
}