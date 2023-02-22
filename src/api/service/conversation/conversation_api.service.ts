import { inject, injectable } from 'inversify';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify.types';
import { ConversationRepository } from '../../repository/conversation.repo';


@injectable()
export class ConversationAPIService{
	constructor(
        @inject(TYPES.ConversationRepository) private readonly conversationRepo: ConversationRepository
	) { }
    
	/////Conversation wake phrase
	//Add Conversation Wake Phrase
	async add_conversation_phrase(payload: any) {
		const checkPhrase = await this.conversationRepo.get_convo_phrase_by_phrase(payload.phrase);
		if (checkPhrase) throw new HttpException('Phrase already exists', 400);
        
		return this.conversationRepo.create_phrase(payload);
	}

	///View Conversation Wake Phrase
	async view_conversation_phrase() {
		return this.conversationRepo.get_phrase();
	}

	///View Conversation Wake Phrase
	async view_conversation_phrase_by_tag(tag: string) {
		return this.conversationRepo.get_phrase_by_query({tag});
	}

	///Update Conversation Wake Phrase
	async update_conversation_phrase(payload :any) {
		return this.conversationRepo.update_phrase(payload._id, payload);
	}

	///Conversation Response phrase
	//Add Conversation Response Phrase
	async add_conversation_response(payload: any) {
		const checkPhrase = await this.conversationRepo.get_convo_res_by_phrase(payload.phrase);
		if (checkPhrase) throw new HttpException('Phrase already exists', 400);
		return this.conversationRepo.create_response(payload);
	}

	///View Conversation Response Phrase
	async view_conversation_response() {
		return this.conversationRepo.get_response();
	}

	///View Conversation Response Phrase
	async view_conversation_response_by_tag(tag: string) {
		return this.conversationRepo.get_response_by_query({tag});
	}

	///Update Conversation Response Phrase
	async update_conversation_response(payload :any) {
		return this.conversationRepo.update_response(payload._id, payload);
	}
}