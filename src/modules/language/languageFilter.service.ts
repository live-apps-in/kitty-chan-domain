import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from '../../shared/redis.service';
import { IGuild } from '../interface/shared.interface';
import { bad_words } from '../../jobs/onInit';
import { liveClient } from '../app';
import { EmojiCode } from '../../common/constants/emoji';

@injectable()
export class LanguageFilter {
  constructor(
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async languageFactory(guild: IGuild) {
    const getStrongLanguageFF = await this.redisService.get(
      `guild-${guild.guildId}:feature:strongLanguage`,
    );

    if (getStrongLanguageFF) {
      await this.strongLanguage(guild);
    }

    return {
      strongLanguage: getStrongLanguageFF ? true : false,
    };
  }

  /**System Default Service
   * If Feature is enabled checks for English Bad words
   */
  private async strongLanguage(guild: IGuild) {
    let { messageContent } = guild;
    messageContent = messageContent.toLowerCase().trim();

    const messageChunk: string[] = messageContent.split(' ');
    let isStrongLanguage = false;

    messageChunk.map((e) => {
      if (bad_words.includes(e)) isStrongLanguage = true;
    });

    if (isStrongLanguage) {
      await liveClient.message.react(
        guild.channelId,
        guild.messageId,
        EmojiCode.warn,
      );
    }
  }
}
