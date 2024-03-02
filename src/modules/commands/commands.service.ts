import { Client } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { IGuild } from 'src/common/interface/guild.interface';
import { UtilityService } from 'src/common/services/utils.service';
import { flip_coin_wake_word } from 'src/modules/commands/wake_words/general';

@Injectable()
export class CommandService {
  private CLIENT_ID = process.env.DISCORD_CLIENT_ID;

  constructor(
    @Inject(UtilityService)
    private readonly utilityService: UtilityService,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
  ) {}

  ///Validate and Filter Command
  async validateCommand(guild: IGuild) {
    const message = guild.plainMessage.trim().toLowerCase();
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

    /**Help Command
     * temp - will be refactored soon
     */
    if (messageChunk[1] === 'help') {
      const content = `Hey there! I'm kitty chan. I'm currently at very early stages of development.
  You will be invited when a stable version is released :)`;

      await this.discordClient.message.reply(
        guild.channelId,
        guild.messageId,
        content,
      );

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

    await this.discordClient.message.reply(
      guild.channelId,
      guild.messageId,
      response.message,
    );
  }
}
