import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { RPS_GAME_Content } from '../../content/games/rpsGame.content';
import { ACTIONS } from '../../enum/action';
import { REPLY } from '../../enum/reply';
import { IGuild } from '../../interface/shared.interface';
import { ActionService } from '../shared/action.service';
import { ResponseService } from '../shared/response.service';
import GameSession from '../../../model/game_session';
import { randomNumber } from '../../../utils/calc';

@injectable()
export class RPSGameService{
	constructor(
        @inject(TYPES.ActionService) private readonly actionService: ActionService,
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService,
	) { }
    
	async initiate(guild: IGuild) {
        
		const createThread = await this.actionService.call({
			type: ACTIONS.createThreadFromMessage,
			guild,
			body: {
				name: `kitty chan VS ${guild.username}`,
				auto_archive_duration: 60
			}
		});

        
		///Send Game info
		if (createThread) {
			///Create Session
			await GameSession.insertMany({
				userId: guild.userId,
				threadId: createThread.id,
				game_data: {
					rounds_completed: 0,
					user_win_count: 0,
					kitty_win_count: 0
				}
			});

			await this.reply(
				REPLY.sendMessage,
				{ channelId: createThread.id },
				RPS_GAME_Content.start
			);
		}

		return;
	}

	async actions(guild: IGuild, action: string) {
		switch (action) {
		case 'rock':
		case 'paper':
		case 'scissors':
			await this.shoot(action, guild);
			break;
            
		case 'stop':
		case 'bye':
			await this.delete(guild);
			break;
		default:
			break;
		}
		return;
	}

	///Shoot
	private async shoot(action: string,  guild: IGuild) {
		const userAction = action;
		const game_actions = ['rock', 'paper', 'scissors'];
		const kittyAction = game_actions[randomNumber(0, 2)];

		const tryShoot = await this.logic(userAction, kittyAction);
        
		///Get Game Session
		const gameSession = await GameSession.findOne({ threadId: guild.channelId, status: 'started' });
		if (!gameSession) return;
        
		const {game_data} = gameSession;
        
		const currentRound = tryShoot.isDraw? game_data.rounds_completed : game_data.rounds_completed + 1;
		const currentUserWinCount = tryShoot.winner === 'user'? game_data.user_win_count + 1 : game_data.user_win_count;
		const currentKittyWinCount = tryShoot.winner === 'kitty'? game_data.kitty_win_count + 1 : game_data.kitty_win_count;
        
		const resContent = {
			username: guild.username,
			userAction,
			kittyAction,
			isDraw: tryShoot.isDraw,
			winner: tryShoot.winner,
			rounds: currentRound,
			currentUserWinCount,
			currentKittyWinCount,
			match_over: currentRound === 5 ? true : false,
			match_winner: null
		};

		if (resContent.match_over) {
			resContent.match_winner = currentUserWinCount > currentKittyWinCount? 'user' : 'kitty';
		}

		///Update Game Session
		await GameSession.updateOne({ threadId: guild.channelId }, {
			$set: { 
				'game_data.rounds_completed': currentRound,
				'game_data.user_win_count': currentUserWinCount,
				'game_data.kitty_win_count': currentKittyWinCount,
				status: resContent.match_over? 'completed': 'started'
			}
		});
        
		await this.reply(
			REPLY.sendMessage,
			{ channelId: guild.channelId },
			RPS_GAME_Content.shoot(resContent)
		);
        
	}

	///End Game
	private async delete(guild: IGuild) {
		///Delete Thread
		guild.payload.channel.delete();

		///Delete Game Session
		await GameSession.deleteOne({ threadId: guild.channelId });
	}

	///Main Game Logic
	private async logic(userAction: string, kittyAction: string) {
		const res = {
			isDraw: false,
			winner: '',
		};

		///If Draw
		if (userAction === kittyAction) res.isDraw = true;

		///if user winner
		if(userAction === 'paper' && kittyAction === 'rock') res.winner = 'user';
		if(userAction === 'rock' && kittyAction === 'scissors') res.winner = 'user';
		if (userAction === 'scissors' && kittyAction === 'paper') res.winner = 'user';
        
		///if kitty winner
		if(kittyAction === 'paper' && userAction === 'rock') res.winner = 'kitty';
		if(kittyAction === 'rock' && userAction === 'scissors') res.winner = 'kitty';
		if (kittyAction === 'scissors' && userAction === 'paper') res.winner = 'kitty';
        
		return res;
        
	}

	private async reply(type: string, guild: IGuild, content: string, payload?: any) {

		if (type === REPLY.sendMessage) {
			await this.responseService.respond({
				type: REPLY.sendMessage,
				guild : {channelId: guild.channelId},
				body: {
					content: content,
				}
			});
			return;
		}
		return;
	}
}