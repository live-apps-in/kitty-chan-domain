import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import ConversationPhrase from '../model/conversation_phrase.model';
import ConversationResponse from '../model/conversation_res.model';


@injectable()
export class ConversationRepository{
    
	///Conversation Wake Phrase
	///Create
	async create_phrase(payload: any) {
		const savePhrase = await ConversationPhrase.insertMany(payload);
		return savePhrase;
	}

	///View
	async get_phrase() {
		const conversation_phrase = await ConversationPhrase.find({});
		return conversation_phrase;
	}

	///View conversation phrase by phrase
	async get_convo_phrase_by_phrase(phrase: string) {
		const getPhrase = await ConversationPhrase.findOne({ phrase: phrase.toLowerCase() });
		return getPhrase;
	}

	///Update
	async update_phrase(_id: Types.ObjectId, payload: any) {
		await ConversationPhrase.updateOne({ _id }, {
			$set: {
				...payload
			}
		});
	}

	///Conversation Response Phrase
	async create_response(payload: any) {
		const savePhrase = await ConversationResponse.insertMany(payload);
		return savePhrase;
	}

	///View
	async get_response() {
		const conversation_phrase = await ConversationResponse.find({});
		return conversation_phrase;
	}

	///View conversation response by phrase
	async get_convo_res_by_phrase(phrase: string) {
		const getPhrase = await ConversationResponse.findOne({ phrase });
		return getPhrase;
	}

	///Update
	async update_response(_id: Types.ObjectId, payload: any) {
		await ConversationResponse.updateOne({ _id }, {
			$set: {
				...payload
			}
		});
	}
}