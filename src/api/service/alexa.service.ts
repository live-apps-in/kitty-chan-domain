import { inject, injectable } from 'inversify';
import { REPLY } from '../../app/enum/reply';
import { ResponseService } from '../../app/service/shared/response.service';
import { TYPES } from '../../core/inversify.types';

@injectable()
export class AlexaService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) { }
    
	async textServer(message: string, username: string) {
        
		const buildMessage = `[ ${username} from Alexa ]: ${message}`;

		await this.responseService.respond({
			type: REPLY.sendMessage,
			guild: {
				channelId: '1039519997778739250' ///Need to change to dynamic - TODO
			},
			body: {
				content: buildMessage
			}
		});
	}
}