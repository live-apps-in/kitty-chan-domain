import { inject, injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';
import 'dotenv/config';
import { TYPES } from '../../core/inversify.types';
import { UtilityService } from './shared/utils.service';
import { flip_coin_wake_word } from '../data/wake_words/general';
import { ConversationService } from './conversation/conversation.service';
import { PortalService } from './portal.service';
import { liveClient } from '../app';

@injectable()
export class CommandService {
  kitty_chan_id = process.env.KITTY_CHAN_ID;
  constructor(
    @inject(TYPES.UtilityService)
    private readonly utilityService: UtilityService,
    @inject(TYPES.ConversationService)
    private readonly conversationService: ConversationService,
    @inject(TYPES.PortalService) private readonly portalService: PortalService,
  ) {}

  ///Validate and Filter Command
  async validateCommand(guild: IGuild) {
    const message = guild.messageContent.trim().toLowerCase();
    let messageChunk = message.split(' ');

    messageChunk = messageChunk.filter((element) => {
      return element !== '';
    });

    ///Check if kitty tagged
    if (messageChunk[0] !== `<@${this.kitty_chan_id}>`) return false;

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
      const content = `Hey there! I'm kitty chan. I'm currently at very early stage of development.
You will be invited when a stable version is released :)`;

      await liveClient.message.reply(guild.channelId, guild.messageId, content);
      return true;
    }

    ///Detect conversation (One Way)
    const tempChunk = [...messageChunk];
    let cleanMessage = '';
    for (let index = 1; index < tempChunk.length; index++) {
      cleanMessage += tempChunk[index] + ' ';
    }
    cleanMessage = cleanMessage.trim();
    const checkConversation = await this.conversationService.filter(
      messageChunk,
      cleanMessage,
      guild,
    );
    if (checkConversation) return true;
    return;
  }

  private async flip_a_coin(guild: IGuild, messageChunk: string[]) {
    const { isMatch } = await this.utilityService.match_wake_phrase(
      messageChunk,
      flip_coin_wake_word,
    );
    if (!isMatch) return;

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

    return;
  }
}
