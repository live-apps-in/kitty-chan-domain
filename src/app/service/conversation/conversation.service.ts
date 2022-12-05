import { inject, injectable } from 'inversify';
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
	){}
	async filter(messageChunk: string[], guild:IGuild) {
		const filter = await this.utilService.match_wake_phrase(messageChunk, conversation_phrase);
		if (!filter.isMatch) return;
		return await this.reply(filter.libIndex, guild);
	}

	private async reply(libIndex: number, guild: IGuild) {
		const resContent = conversation_phrase_response[libIndex];
		const resContentLength = resContent.length;
		let resMessage: string;

	    if (resContentLength === 1) {
		    resMessage = resContent[0];
		} else {
			const randomResponse = randomNumber(1, resContentLength);
			resMessage = resContent[randomResponse - 1]; 
		}

		if (!resMessage) return;
		await this.responseService.respond({
			type: REPLY.replyMessage,
			guild,
			body: {
				content: resMessage,
				message_reference: {
					message_id: guild.messageId
				}
			}
		});

		return true;
	}
}