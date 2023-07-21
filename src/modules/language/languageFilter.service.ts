import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from '../../common/services/redis.service';
import { IGuild } from '../../common/interface/shared.interface';
import { bad_words } from '../../jobs/onInit';
import { liveClient } from '../app';
import { EmojiCode } from '../../common/constants/emoji';
import featuresModel from '../../model/features.model';
import { LanguageFilterConfigDto } from './dto/languageFilter.dto';
import DataLibsModel from '../../model/data_libs.model';
import { DataStructure } from '../../common/services/dataStructure.service';
import { LanguageFilterAction } from './enum/language_filter.enum';

@injectable()
export class LanguageFilter {
  constructor(
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
    @inject(TYPES.DataStructureService)
    private readonly dataStructure: DataStructure,
  ) {}

  async languageFactory(guild: IGuild): Promise<void> {
    /**Strong Language [EN] */
    const getStrongLanguageFF = await this.redisService.get(
      `guild-${guild.guildId}:feature:strongLanguageEn`,
    );

    if (getStrongLanguageFF) {
      await this.strongLanguageEn(guild);
    }

    /**Language Filter */
    const getLanguageFilterFF = await this.redisService.get(
      `guild-${guild.guildId}:feature:languageFilter`,
    );

    if (getLanguageFilterFF) {
      this.languageFilter(guild);
    }
  }

  /**System Default Service
   * If Feature is enabled checks for English Bad words
   */
  private async strongLanguageEn(guild: IGuild) {
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

  /**Language Filter
   * Uses Data Libs & Data Structure service
   */
  private async languageFilter(guild: IGuild) {
    const languageFilterConfig = await this.getLanguageFilterConfig(guild);

    for (const e of languageFilterConfig) {
      const dataLib = await this.getDataLib(guild, e.dataLibId);

      const { detected } = this.dataStructure.matchPhrase(
        guild.messageContent,
        dataLib,
      );

      if (detected) {
        const actionConfig = e.actionConfig;

        switch (actionConfig.action) {
          case LanguageFilterAction.REACT:
            await liveClient.message.react(
              guild.channelId,
              guild.messageId,
              actionConfig.reactEmoji,
            );
            break;

          case LanguageFilterAction.REPLY:
            await liveClient.message.reply(
              guild.channelId,
              guild.messageId,
              actionConfig.replyMessage,
            );
            break;

          default:
            break;
        }
      }
    }
  }

  /**Language FIlter Config */
  private async getLanguageFilterConfig(
    guild: IGuild,
  ): Promise<LanguageFilterConfigDto[]> {
    let languageFilterConfig: LanguageFilterConfigDto[] = [];
    const cacheKey = `guild-${guild.guildId}:feature:languageFilterConfig`;

    const cachedConfig = await this.redisService.get(cacheKey);

    if (!cachedConfig) {
      const languageFeature = await featuresModel.findOne(
        { guildId: guild.guildId },
        { language: 1 },
      );

      languageFilterConfig =
        languageFeature?.language?.languageFilter?.languageFilterConfig || [];

      await this.redisService.setWithExpiry(
        cacheKey,
        JSON.stringify(languageFilterConfig),
        300,
      );
    } else {
      languageFilterConfig = JSON.parse(cachedConfig);
    }

    return languageFilterConfig;
  }

  /**Language Filter - Data Lib */
  private async getDataLib(
    guild: IGuild,
    dataLibId: string,
  ): Promise<string[]> {
    let dataLib: string[] = [];
    const cacheKey = `guild-${guild.guildId}:dataLib-${dataLibId}`;

    const cachedDataLib = await this.redisService.get(cacheKey);

    if (!cachedDataLib) {
      const getDataLib = await DataLibsModel.findOne({ _id: dataLibId });
      dataLib = getDataLib?.data || [];

      await this.redisService.setWithExpiry(
        cacheKey,
        JSON.stringify(dataLib),
        300,
      );
    } else {
      dataLib = JSON.parse(cachedDataLib);
    }

    return dataLib;
  }
}
