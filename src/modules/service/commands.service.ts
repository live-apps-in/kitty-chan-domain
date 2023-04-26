import { inject, injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';
import 'dotenv/config';
import { TYPES } from '../../core/inversify.types';
import {
  VALORANT_RANK,
  VALORANT_RANK_ROLES,
} from '../data/valorant/valorant_ranks';
import { RANK_MESSAGES } from '../content/rank.content';
import { UtilityService } from './shared/utils.service';
import { flip_coin_wake_word } from '../data/wake_words/general';
import { ConversationService } from './conversation/conversation.service';
import { PortalService } from './portal.service';
import { ImageService } from './image.service';
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
    @inject(TYPES.imageService) private readonly imageService: ImageService,
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

    ///Check Rank Set Command
    if (messageChunk[1] === 'rank' && guild?.featureFlag?.valorant_set_rank) {
      await this.set_rank(guild, messageChunk[2]);
      return true;
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

    ///Image
    if (messageChunk[1] === 'image') {
      await this.imageService.validate(messageChunk, guild);
      return true;
    }

    /**Help Command
     * temp - will be refactored soon
     */
    if (messageChunk[1] === 'help') {
      const content = `Hey there! I'm kitty chan. I'm currently at very early stage of development.
You will be invited when a stable version is released :)`;

      liveClient.message.reply(guild.channelId, guild.messageId, content);
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

  async set_rank(guild: IGuild, rank: string) {
    if (!rank) {
      liveClient.message.reply(
        guild.channelId,
        guild.messageId,
        RANK_MESSAGES.invalid_rank,
      );

      return;
    }

    ///Check if roles exists
    const userRoles = guild.payload.member.roles.cache;
    let currentRank;
    VALORANT_RANK.map((rank) => {
      if (userRoles.some((role) => role.name.split('-')[0] === rank)) {
        currentRank = rank;
        return;
      }
      return;
    });

    if (currentRank) {
      liveClient.roles.set(
        guild.guildId,
        guild.userId,
        VALORANT_RANK_ROLES[currentRank],
      );
    }

    ///Validate & Assign Roles
    let isRoleValid = false;
    for (let index = 0; index < VALORANT_RANK.length; index++) {
      const element = VALORANT_RANK[index];
      if (element.toLowerCase() === rank.toLowerCase()) {
        liveClient.roles.set(
          guild.guildId,
          guild.userId,
          VALORANT_RANK_ROLES[element],
        );

        isRoleValid = true;
        break;
      }
    }

    if (!isRoleValid) {
      liveClient.message.reply(
        guild.channelId,
        guild.messageId,
        RANK_MESSAGES.invalid_rank,
      );

      return;
    } else {
      liveClient.message.reply(
        guild.channelId,
        guild.messageId,
        RANK_MESSAGES.after_setRank,
      );

      return;
    }
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

    liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      response.message,
    );

    return;
  }
}
