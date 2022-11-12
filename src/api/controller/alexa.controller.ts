import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../core/inversify.types';
import { AlexaService } from '../service/alexa.service';

@controller('/alexa/ask')
export class AlexaController{
	constructor(
        @inject(TYPES.AlexaService) private readonly alexaService: AlexaService
	) { }
    
    @httpPost('/server/text')
	async textServer(req: Request) {
		const { message, username, messageType } = req.body;
		console.log(req.body, 'REQUEST BODY');
		await this.alexaService.textServer(message, username, messageType);
		return {
			message: 'Message Sent'
		};
	}
}