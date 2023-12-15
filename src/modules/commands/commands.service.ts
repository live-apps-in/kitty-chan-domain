import { inject, injectable } from 'inversify';
import { IGuild } from '../../common/interface/shared.interface';
import 'dotenv/config';
import { TYPES } from '../../core/inversify.types';
import { UtilityService } from '../../common/services/utils.service';
import { flip_coin_wake_word } from './data/wake_words/general';
import { PortalService } from '../portal/portal.service';
import { liveClient } from '../app';

@injectable()
export class CommandService {
  private CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  constructor(
    @inject(TYPES.UtilityService)
    private readonly utilityService: UtilityService,
    @inject(TYPES.PortalService) private readonly portalService: PortalService,
  ) {}

  ///Validate and Filter Command
  async validateCommand(guild: IGuild) {
    const message = guild.messageContent.trim().toLowerCase();
    let messageChunk = message.split(' ');

    messageChunk = messageChunk.filter((element) => {
      return element !== '';
    });

    if (messageChunk[0] !== `<@${this.CLIENT_ID}>`) {
      return false;
    }

    ///Flip a coin
    if (messageChunk[1] === 'flip') {
      await this.flip_a_coin(guild, messageChunk);

      return true;
    }

    ///Flip a coin
    if (messageChunk[1] === 'portal') {
      await this.portalService.validate(messageChunk, guild);

      return true;
    }

    /**Help Command
     * temp - will be refactored soon
     */
    if (messageChunk[1] === 'help') {
      const content = `Hey there! I'm kitty chan. I'm currently at very early stages of development.
  You will be invited when a stable version is released :)`;

      await liveClient.message.reply(guild.channelId, guild.messageId, content);

      return true;
    }
  }

  private async flip_a_coin(guild: IGuild, messageChunk: string[]) {
    const { isMatch } = await this.utilityService.match_wake_phrase(
      messageChunk,
      flip_coin_wake_word,
    );
    if (!isMatch) {
      return false;
    }

    let response: any = {};
    if (Math.random() < 0.5) {
      response = {
        outcome: 'heads',
        message: "It's Heads!",
      };
    } else {
      response = {
        outcome: 'tails',
        message: "It's Tails!",
      };
    }

    await liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      response.message,
    );
  }
}
