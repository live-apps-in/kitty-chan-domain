import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { find_valo_comp_template, find_valo_unranked_template } from '../content/rank.content';
import { valorant_find_player_comp, valorant_find_player_unranked } from '../data/valorant/valorant_call';
import { valorant_call_signs, valorant_comp_calls, valorant_unranked_calls } from '../data/wake_words/valorant';
import { REPLY } from '../enum/reply';
import { IGuild } from '../interface/shared.interface';
import { ResponseService } from './shared/response.service';
import { UtilityService } from './shared/utils.service';
import { ValorantService } from './valorant/valorant.service';


@injectable()
export class WakeService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService,
		@inject(TYPES.ValorantService) private readonly valorantService: ValorantService,
		@inject(TYPES.UtilityService) private readonly utilityService: UtilityService,
	) { }
    
	async validate(guild: IGuild) {
		const messageChunk = guild.messageContent.split(' ');

		///Find Valorant Players
		const isFindValPlayerCommand = await this.find_val_players(messageChunk, guild);
		if (isFindValPlayerCommand) return;
        
	}

	///Detect phrase for VALORANT Ranked and Unranked
	private async find_val_players(messageChunk: string[], guild: IGuild) {
		let isValidCalSign = false;
		let isComp = false;
		messageChunk.map(e => {
			if (valorant_call_signs.includes(e.toLowerCase())) isValidCalSign = true;
			if (valorant_comp_calls.includes(e.toLowerCase())) isComp = true;
		});

		///Return if no match
		if (!isValidCalSign) return false;

		///Check for Wake words
		const valorant_wake_sentence: string[][] = isComp? valorant_find_player_comp : valorant_find_player_unranked;
		const {isMatch} = await this.utilityService.match_wake_phrase(messageChunk, valorant_wake_sentence);

		
		if (!isMatch) return false;
		///Notify content for Unranked and Comp
		let replyContent = find_valo_unranked_template(guild);
		if (isComp) replyContent = await find_valo_comp_template(guild);
		
		await this.responseService.respond({
			guild,
			type: REPLY.replyMessage,
			body: {
				content: replyContent,
				message_reference: {
					message_id: guild.messageId
				}
			}
		});

		return true;

	}
}