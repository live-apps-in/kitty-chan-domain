import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { find_valo_unranked_template } from '../content/rank.content';
import { valorant_find_player_unranked } from '../data/valorant/valorant_call';
import { valorant_call_signs } from '../data/wake_words/valorant';
import { REPLY } from '../enum/reply';
import { IGuild } from '../interface/shared.interface';
import { ResponseService } from './shared/response.service';


@injectable()
export class WakeService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) { }
    
	async validate(guild: IGuild) {
		const messageChunk = guild.messageContent.split(' ');

		///Find Valorant Players
		const isFindValPlayerCommand = await this.find_val_players(messageChunk, guild);
		if (isFindValPlayerCommand) return;
        
	}

	private async find_val_players(messageChunk: string[], guild: IGuild) {
		let isValidCalSign = false;
		messageChunk.map(e => {
			if (valorant_call_signs.includes(e.toLowerCase())) isValidCalSign = true;
		});

		///Return if no match
		if (!isValidCalSign) return false;

		///Check for Wake words
		let isMatch = false;
		for (let index = 0; index < valorant_find_player_unranked.length; index++) {
			if (isMatch) break;

			//Length of single wake word array
			const wakeWordCount = valorant_find_player_unranked[index].length;
			let matchCount = 0;
			const temp_wake_words = [...valorant_find_player_unranked[index]];

			//Loop Single Wake word array
			for (let i = 0; i < temp_wake_words.length; i++) {
				if (isMatch) break;
				const wakeWord = temp_wake_words[i];

				//Loop message chunk
				for (let j = 0; j < messageChunk.length; j++) {
					const element = messageChunk[j].toLowerCase();
					if (wakeWord === element) {
						temp_wake_words[i] = '';
						matchCount += 1;
					}
				}
				if (matchCount >= wakeWordCount) isMatch = true;
                
			}
            
		}
        
		if (!isMatch) return false;
		await this.responseService.respond({
			guild,
			type: REPLY.replyMessage,
			body: {
				content: find_valo_unranked_template(guild),
				message_reference: {
					message_id: guild.messageId
				}
			}
		});

		return true;

	}
}