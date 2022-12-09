import { inject, injectable } from 'inversify';
import { ConversationRepository } from '../../../api/repository/conversation.repo';
import { ConversationAPIService } from '../../../api/service/conversation/conversation_api.service';
import { TYPES } from '../../../core/inversify.types';
import { randomNumber } from '../../../utils/calc';
import { conversation_phrase, conversation_phrase_response } from '../../data/conversation/conversation';
import { REPLY } from '../../enum/reply';
import { IGuild } from '../../interface/shared.interface';
import { ResponseService } from '../shared/response.service';
import { UtilityService } from '../shared/utils.service';



@injectable()
export class ConversationService{
	constructor(
        @inject(TYPES.UtilityService) private readonly utilService: UtilityService,
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService,
        @inject(TYPES.ConversationRepository) private readonly conversationRepo: ConversationRepository,
	){}
	async filter(messageChunk: string[], cleanMessage: string, guild: IGuild) {
		const matchWakePhrase: any = await this.conversationRepo.regex_phrase(cleanMessage)
		if (!matchWakePhrase) return;

		let matchPhraseChunk = matchWakePhrase.phrase.split(" ")
		let resPhraseIds = matchWakePhrase.resPhraseId
		let resPhraseId;

		///Validate Full Match
		const validatePhraseMatch = await this.utilService.match_wake_phrase_db(messageChunk, matchPhraseChunk)
		console.log(validatePhraseMatch)

		///Randomize response
		if (resPhraseIds === 1) {
		    resPhraseId = resPhraseIds[0];
		} else {
			const randomResponse = randomNumber(1, resPhraseIds.length);
			resPhraseId = resPhraseIds[randomResponse - 1]; 
		}
		const getResPhrase = await this.conversationRepo.get_convo_res_by_id(resPhraseId)
		if (!getResPhrase) return;

		
		const filter = await this.utilService.match_wake_phrase(messageChunk, conversation_phrase);
		if (!filter.isMatch) return;
		return await this.reply(getResPhrase.phrase, guild);
	}

	private async reply(phrase: string, guild: IGuild) {

		await this.responseService.respond({
			type: REPLY.replyMessage,
			guild,
			body: {
				content: phrase,
				message_reference: {
					message_id: guild.messageId
				}
			}
		});

		return true;
	}
}