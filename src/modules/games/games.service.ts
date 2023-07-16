import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import GameSession from '../../model/game_session';
import { RPS_WAKE_ACTIONS } from './data/rpsGame';

import { IGuild } from '../../common/interface/shared.interface';
import { RPSGameService } from './RPSGame.service';

@injectable()
export class GamesService {
  private kitty_chan_id = process.env.KITTY_CHAN_ID;
  constructor(
    @inject(TYPES.RPSGameService)
    private readonly rpsGameService: RPSGameService,
  ) {}

  async call(guild: IGuild): Promise<any> {
    const message = guild.messageContent.trim().toLowerCase();
    let messageChunk = message.split(' ');

    messageChunk = messageChunk.filter((element) => {
      return element !== '';
    });

    ///Check if kitty tagged
    if (messageChunk[0] !== `<@${this.kitty_chan_id}>`) return false;

    ///Flip a coin
    if (messageChunk[1] === 'play') {
      const isGameValid = await this.gameFactory(messageChunk, guild);
      return isGameValid;
    }

    return false;
  }

  ///Check if its a ongoing game
  async validateGame(guild: IGuild): Promise<any> {
    const message = guild.messageContent.trim().toLowerCase();
    const messageChunk = message.split(' ');

    ///Check Session
    const gameSession = await GameSession.findOne({
      threadId: guild.channelId,
    });
    if (!gameSession) return;

    const isValidGameCommand = await this.detectGamePhrase(messageChunk);
    if (!isValidGameCommand) return;

    switch (isValidGameCommand) {
      case 'rps':
        await this.rpsGameService.actions(guild, messageChunk[0]);
        break;

      default:
        break;
    }

    return false;
  }

  ///Validate From commands
  private async gameFactory(messageChunk: string[], guild: IGuild) {
    if (
      messageChunk[2] === 'rock' &&
      messageChunk[3] === 'paper' &&
      messageChunk[4] === 'scissors'
    ) {
      await this.rpsGameService.initiate(guild);
      return true;
    }
  }

  ///Validate from Phrase
  private async detectGamePhrase(messageChunk: string[]) {
    let gameType: string;

    ///Validate RPS
    if (RPS_WAKE_ACTIONS.includes(messageChunk[0])) gameType = 'rps';

    return gameType;
  }
}
