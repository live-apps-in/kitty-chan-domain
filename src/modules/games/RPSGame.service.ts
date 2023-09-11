import { injectable } from 'inversify';
import { randomNumber } from '../../utils/calc';
import { liveClient } from '../app';
import { RPS_GAME_Content } from './content/rpsGame.content';
import { IGuild } from '../../common/interface/shared.interface';
import GameSession from './model/game_session';

@injectable()
export class RPSGameService {
  async initiate(guild: IGuild) {
    const thread = await liveClient.message.createThread(
      guild.channelId,
      guild.messageId,
      {
        name: `kitty chan VS ${guild.username}`,
        auto_archive_duration: 60,
      },
    );

    ///Check Ongoing session
    if (!thread) return;
    const getOngoingSession = await GameSession.findOne({
      userId: guild.userId,
      guildId: guild.guildId,
    });

    if (getOngoingSession) {
      await GameSession.deleteOne({ _id: getOngoingSession._id }).then(
        async (res) => {
          if (res.deletedCount === 1) {
            await liveClient.message.delete(guild.channelId, guild.messageId);
          }
        },
      );
    }

    ///Create Session
    await GameSession.insertMany({
      userId: guild.userId,
      threadId: thread.id,
      guildId: guild.guildId,
      game_data: {
        rounds_completed: 0,
        user_win_count: 0,
        kitty_win_count: 0,
      },
    });

    console.log(thread);
    await liveClient.message.reply(
      thread.id,
      guild.messageId,
      RPS_GAME_Content.start,
    );

    return;
  }

  async actions(guild: IGuild, action: string) {
    switch (action) {
      ///Shoot
      case 'rock':
      case 'paper':
      case 'scissors':
        await this.shoot(action, guild);
        break;

      ///Restart Game
      case 'restart':
        await this.restart(guild);
        break;

      ///End game
      case 'stop':
        await this.delete(guild);
        break;
      default:
        break;
    }
    return;
  }

  ///Shoot
  private async shoot(
    action: string,
    { channelId, messageId, username }: IGuild,
  ) {
    const userAction = action;
    const game_actions = ['rock', 'paper', 'scissors'];
    const kittyAction = game_actions[randomNumber(0, 2)];

    const tryShoot = await this.logic(userAction, kittyAction);

    ///Get Game Session
    const gameSession = await GameSession.findOne({
      threadId: channelId,
      status: 'started',
    });
    if (!gameSession) return;

    const { game_data } = gameSession;

    const currentRound = tryShoot.isDraw
      ? game_data.rounds_completed
      : game_data.rounds_completed + 1;
    const currentUserWinCount =
      tryShoot.winner === 'user'
        ? game_data.user_win_count + 1
        : game_data.user_win_count;
    const currentKittyWinCount =
      tryShoot.winner === 'kitty'
        ? game_data.kitty_win_count + 1
        : game_data.kitty_win_count;

    const resContent = {
      username,
      userAction,
      kittyAction,
      isDraw: tryShoot.isDraw,
      winner: tryShoot.winner,
      rounds: currentRound,
      currentUserWinCount,
      currentKittyWinCount,
      match_over: currentRound === 5 ? true : false,
      match_winner: null,
    };

    if (resContent.match_over) {
      resContent.match_winner =
        currentUserWinCount > currentKittyWinCount ? 'user' : 'kitty';
    }

    ///Update Game Session
    await GameSession.updateOne(
      { threadId: channelId },
      {
        $set: {
          'game_data.rounds_completed': currentRound,
          'game_data.user_win_count': currentUserWinCount,
          'game_data.kitty_win_count': currentKittyWinCount,
          status: resContent.match_over ? 'completed' : 'started',
        },
      },
    );

    await liveClient.message.reply(
      channelId,
      messageId,
      RPS_GAME_Content.shoot(resContent),
    );
  }

  private async restart(guild: IGuild) {
    await GameSession.updateOne(
      { threadId: guild.channelId, guildId: guild.guildId },
      {
        $set: {
          'game_data.rounds_completed': 0,
          'game_data.user_win_count': 0,
          'game_data.kitty_win_count': 0,
          status: 'started',
        },
      },
    );

    await liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      RPS_GAME_Content.start,
    );
    return;
  }

  ///Delete Game Session
  async deleteSession(threadId: string) {
    ///Delete Game Session
    await GameSession.deleteOne({ threadId });
  }

  ///End Game
  private async delete(guild: IGuild) {
    ///Delete Thread
    await liveClient.message.delete(guild.channelId, guild.messageId);

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
    if (userAction === 'paper' && kittyAction === 'rock') res.winner = 'user';
    if (userAction === 'rock' && kittyAction === 'scissors')
      res.winner = 'user';
    if (userAction === 'scissors' && kittyAction === 'paper')
      res.winner = 'user';

    ///if kitty winner
    if (kittyAction === 'paper' && userAction === 'rock') res.winner = 'kitty';
    if (kittyAction === 'rock' && userAction === 'scissors')
      res.winner = 'kitty';
    if (kittyAction === 'scissors' && userAction === 'paper')
      res.winner = 'kitty';

    return res;
  }
}
