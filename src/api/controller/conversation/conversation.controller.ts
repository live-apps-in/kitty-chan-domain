import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../../core/inversify.types';
import { ConversationAPIService } from '../../service/conversation/conversation_api.service';



@controller('/conversation')
export class ConversationController{
	constructor(
        @inject(TYPES.ConversationAPIService) private readonly conversationService: ConversationAPIService
	) { }

    ////Conversation Wake Phrase
    //Create Conversation wake phrase
    @httpPost('/phrase')
	async addConversationPhrase(req: Request) {
		const savePhrase = await this.conversationService.add_conversation_phrase(req.body);
		return savePhrase;
	}

    ///View Conversation wake phrase
    @httpGet('/phrase')
    async getConversationPhrase() {
    	const getPhrase = await this.conversationService.view_conversation_phrase();
    	return getPhrase;
    }

    ///Update Conversation wake phrase
    @httpPatch('/phrase')
    async updateConversationPhrase(req: Request) {
    	await this.conversationService.update_conversation_phrase(req.body);
    }


    ///Conversation Response Phrase
    @httpPost('/response')
    async addConversationResponse(req: Request) {
    	const savePhrase = await this.conversationService.add_conversation_response(req.body);
    	return savePhrase;
    }

    ///View Conversation wake phrase
    @httpGet('/response')
    async getConversationResponse() {
    	const getPhrase = await this.conversationService.view_conversation_response();
    	return getPhrase;
    }

    ///Update Conversation wake phrase
    @httpPatch('/response')
    async updateConversationResponse(req: Request) {
    	await this.conversationService.update_conversation_response(req.body);
    }
}