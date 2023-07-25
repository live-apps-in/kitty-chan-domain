import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from '../../common/services/redis.service';
import { IGuild } from '../../common/interface/shared.interface';
import { strong_language_en } from '../../jobs/onInit';
import { liveClient } from '../app';
import { EmojiCode } from '../../common/constants/emoji';
import featuresModel from '../../model/features.model';
import { LanguageFilterConfigDto } from './dto/languageFilter.dto';
import DataLibsModel from '../../model/data_libs.model';
import { DataStructure } from '../../common/services/dataStructure.service';
import { LanguageAction } from './enum/language_filter.enum';
import { StrongLanguage } from './dto/strongLanguage.dto';
import { StrongLanguageCodes } from './enum/strong_language.enum';
import { DiscordActionService } from '../../common/services/discord_action.service';
import { DiscordActions } from '../../common/enum/discord_action.enum';

@injectable()
export class LanguageFilter {
  constructor(
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
    @inject(TYPES.DataStructureService)
    private readonly dataStructure: DataStructure,
    @inject(TYPES.DiscordActionService)
    private readonly discordActionService: DiscordActionService,
  ) {}

  async languageFactory(guild: IGuild): Promise<void> {
    /**Strong Language [EN] */
    const getStrongLanguageFF = await this.redisService.get(
      `guild-${guild.guildId}:feature:strongLanguage`,
    );

    if (getStrongLanguageFF) {
      await this.strongLanguage(guild);
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
  private async strongLanguage(guild: IGuild) {
    const strongLanguageConfig: StrongLanguage =
      await this.getStrongLanguageConfig(guild);
    if (!strongLanguageConfig?.isActive) return;

    const {
      actionConfig,
      languages,
    }: { actionConfig: any; languages: StrongLanguageCodes[] } =
      strongLanguageConfig;

    const { messageContent } = guild;

    if (languages.includes(StrongLanguageCodes.EN)) {
      const { detected } = this.dataStructure.matchPhrase(
        messageContent,
        strong_language_en,
      );

      if (detected) {
        await this.discordActionService.actionFactory(
          actionConfig.action,
          guild,
          actionConfig,
        );
      }
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
        const actionConfig = e.actionConfig as any;

        if (detected) {
          await this.discordActionService.actionFactory(
            actionConfig.action,
            guild,
            actionConfig,
          );
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

  /**Strong Language Config */
  private async getStrongLanguageConfig(
    guild: IGuild,
  ): Promise<StrongLanguage> {
    let strongLanguageConfig: StrongLanguage;
    const cacheKey = `guild-${guild.guildId}:feature:strongLanguageConfig`;

    const cachedConfig = await this.redisService.get(cacheKey);

    if (!cachedConfig) {
      const strongLanguageFeature = await featuresModel.findOne(
        { guildId: guild.guildId },
        { language: 1 },
      );

      strongLanguageConfig = strongLanguageFeature?.language?.strongLanguage;

      await this.redisService.setWithExpiry(
        cacheKey,
        JSON.stringify(strongLanguageConfig),
        300,
      );
    } else {
      strongLanguageConfig = JSON.parse(cachedConfig);
    }

    return strongLanguageConfig;
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
