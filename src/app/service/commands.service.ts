import { inject, injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';
import 'dotenv/config';
import { TYPES } from '../../core/inversify.types';
import { ActionService } from './shared/action.service';
import { VALORANT_RANK, VALORANT_RANK_ROLES } from '../data/valorant/valorant_ranks';
import { ResponseService } from './shared/response.service';
import { REPLY } from '../enum/reply';
import { RANK_MESSAGES } from '../content/rank.content';

@injectable()
export class CommandService{
	kitty_chan_id = process.env.KITTY_CHAN_ID;
	constructor(
        @inject(TYPES.ActionService) private readonly actionService: ActionService,
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService,
	) { }
    
	///Validate and Filter Command
	async validateCommand(guild: IGuild) {
		const message = (guild.messageContent).trim().toLowerCase();
		let messageChunk = message.split(' ');

		messageChunk = messageChunk.filter(element => {
  				return element !== '';
		});

		///Check if kitty tagged
		if (messageChunk[0] !== `<@${this.kitty_chan_id}>`) return;

		///Check Rank Set Command
		if (messageChunk[1] === 'rank') {
			await this.set_rank(guild, messageChunk[2]);
			return;
		}

		///Flip a coin
		if (messageChunk[1] === 'flip') {
			await this.flip_a_coin(guild, messageChunk);
			return;
		}
	}

	async set_rank(guild: IGuild, rank: string) {
		if (!rank) {
            
			await this.responseService.respond({
				type: REPLY.replyMessage,
				guild,
				body: {
					content: RANK_MESSAGES.invalid_rank,
					message_reference: {
						message_id: guild.messageId
					}
				}
			});
            
			return;
		}
		///Validate & Assign Roles
		let isRoleValid = false;
		for (let index = 0; index < VALORANT_RANK.length; index++) {
			const element = VALORANT_RANK[index];
			if (element.toLowerCase() === rank.toLowerCase()) {
				///Call API
				await this.actionService.call({
					type: 'setRole',
					guild,
					body: {
						roleId: VALORANT_RANK_ROLES[element]
					}
				});
				isRoleValid = true;
				break;
			}
		}

		if (!isRoleValid) {
			await this.responseService.respond({
				type: REPLY.replyMessage,
				guild,
				body: {
					content: RANK_MESSAGES.invalid_rank,
					message_reference: {
						message_id: guild.messageId
					}
				}
			});
			return;
		} else {
			await this.responseService.respond({
				type: REPLY.replyMessage,
				guild,
				body: {
					content: RANK_MESSAGES.after_setRank,
					message_reference: {
						message_id: guild.messageId
					}
				}
			});
			return;
		}

        
	}

	private async flip_a_coin(guild: IGuild, messageChunk: string[]) {
		if (messageChunk[2] !== "a" && messageChunk[3] !== "coin") return;

		let response: any= {}
		if(Math.random() < 0.50) {
			response = {
				outcome: 'heads',
				message: 'It\'s Heads!'
			}
        } else {
            response = {
				outcome: 'tails',
				message: 'It\'s Tails!'
			}
		}

		await this.responseService.respond({
				type: REPLY.replyMessage,
				guild,
				body: {
					content: response.message,
					message_reference: {
						message_id: guild.messageId
					}
				}
			});
		
		return;

	}
}