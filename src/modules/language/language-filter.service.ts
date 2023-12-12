import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from '../../common/services/redis.service';
import { IGuild } from '../../common/interface/shared.interface';
import { strong_language_en } from '../../jobs/on-init';
import featuresModel from '../features/model/features.model';
import { LanguageFilterConfigDto } from './dto/language-filter.dto';
import LanguageLibsModel from './model/language-libs.model';
import { DataStructure } from '../../common/services/data-structure.service';
import {
  StrongLanguage,
  StrongLanguageConfig,
} from './dto/strong-language.dto';
import { StrongLanguageCodes } from './enum/strong-language.enum';
import { DiscordActionService } from '../../common/services/discord-action.service';
import { LanguageProcessorService } from './language-processor.service';

@injectable()
export class LanguageFilter {
  constructor(
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
    @inject(TYPES.DataStructureService)
    private readonly dataStructure: DataStructure,
    @inject(TYPES.DiscordActionService)
    private readonly discordActionService: DiscordActionService,
    @inject(TYPES.LanguageProcessorService)
    private readonly languageProcessor: LanguageProcessorService,
  ) {}

  async languageFactory(guild: IGuild): Promise<void> {
    /**Strong Language */
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
      languageConfig,
    }: { actionConfig: any; languageConfig: StrongLanguageConfig[] } =
      strongLanguageConfig;

    const { messageContent } = guild;

    languageConfig.map(async (e) => {
      if (e.language === StrongLanguageCodes.EN) {
        await this.languageProcessor.textMatchAndWhiteList(
          'language-lib',
          'strong-language-esn',
          messageContent,
        );

        const languageLib = await this.getLanguageLib(guild, e.whitelistLib);

        const { detected } = this.dataStructure.matchPhrase(
          messageContent,
          strong_language_en,
          languageLib,
        );

        if (detected) {
          await this.discordActionService.actionFactory(
            actionConfig.action,
            guild,
            actionConfig,
          );
        }
      }
    });
  }

  /**Language Filter
   * Uses Data Libs & Data Structure service
   */
  private async languageFilter(guild: IGuild) {
    const languageFilterConfig = await this.getLanguageFilterConfig(guild);

    for (const e of languageFilterConfig) {
      const languageLib = await this.getLanguageLib(guild, e.languageLibId);

      const { detected } = this.dataStructure.matchPhrase(
        guild.messageContent,
        languageLib,
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
  private async getLanguageLib(
    guild: IGuild,
    languageLibId: string,
  ): Promise<string[]> {
    let languageLib: string[] = [];
    const cacheKey = `guild-${guild.guildId}:languageLib-${languageLibId}`;

    const cachedLanguageLib = await this.redisService.get(cacheKey);

    if (!cachedLanguageLib) {
      const getLanguageLib = await LanguageLibsModel.findOne({
        _id: languageLibId,
      });
      languageLib = getLanguageLib?.data || [];

      await this.redisService.setWithExpiry(
        cacheKey,
        JSON.stringify(languageLib),
        300,
      );
    } else {
      languageLib = JSON.parse(cachedLanguageLib) || [];
    }

    return languageLib;
  }
}
