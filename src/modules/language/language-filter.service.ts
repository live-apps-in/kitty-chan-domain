import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LanguageLibRefIds } from 'src/common/constants/es.store';
import { IGuild } from 'src/common/interface/guild.interface';
import { DiscordActionService } from 'src/common/services/discord-action.service';
import { Features } from 'src/modules/features/model/features.model';
import { LanguageProcessorService } from 'src/modules/language/language-processor.service';
import { Model } from 'mongoose';
import {
  StrongLanguageConfig,
  StrongLanguageDto,
} from 'src/modules/language/dto/strong_language.dto';
import { LanguageFilterDto } from 'src/modules/language/dto/language_filter.dto';
import { StrongLanguageCodes } from 'src/modules/language/enum/strong_language.enum';
import { RedisService } from 'src/common/services/connectivity/redis.service';

@Injectable()
export class LanguageFilter {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(DiscordActionService)
    private readonly discordActionService: DiscordActionService,
    @Inject(LanguageProcessorService)
    private readonly languageProcessor: LanguageProcessorService,
    @InjectModel(Features.name)
    private readonly featuresModel: Model<Features>,
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
    const strongLanguageConfig: StrongLanguageDto =
      await this.getStrongLanguageConfig(guild);

    if (!strongLanguageConfig?.isActive) return;

    const {
      actionConfig,
      languageConfig,
    }: { actionConfig: any; languageConfig: StrongLanguageConfig[] } =
      strongLanguageConfig;

    const { plainMessage } = guild;

    languageConfig.map(async (config) => {
      if (config.language === StrongLanguageCodes.EN) {
        const { detected } = await this.languageProcessor.textMatchAndWhiteList(
          'language-lib',
          LanguageLibRefIds['strong-language-en'],
          plainMessage,
          config.whitelistLib.toString(),
        );

        for (const config of actionConfig) {
          config.messageConfig.channelId = guild.channelId;
          config.messageConfig.messageId = guild.messageId;
        }

        if (detected) {
          await this.discordActionService.process(actionConfig);
        }
      }
    });
  }

  /**Language Filter
   * Uses Data Libs & Data Structure service
   */
  private async languageFilter(guild: IGuild) {
    const { languageFilterConfig } = await this.getLanguageFilterConfig(guild);

    for (const config of languageFilterConfig) {
      const { detected } = await this.languageProcessor.textMatchAndWhiteList(
        'language-lib',
        config.languageLibId,
        guild.plainMessage,
      );

      for (const actionConfig of config.actionConfig as any) {
        actionConfig.messageConfig.channelId = guild.channelId;
        actionConfig.messageConfig.messageId = guild.messageId;
      }

      if (detected) {
        await this.discordActionService.process(config.actionConfig);
      }
    }
  }

  /**Language FIlter Config */
  private async getLanguageFilterConfig(
    guild: IGuild,
  ): Promise<LanguageFilterDto> {
    let languageFilterConfig: LanguageFilterDto;
    const cacheKey = `guild-${guild.guildId}:feature:languageFilterConfig`;

    const cachedConfig = await this.redisService.get(cacheKey);

    if (!cachedConfig) {
      const languageFeature = await this.featuresModel.findOne(
        { guildId: guild.guildId },
        { language: 1 },
      );

      languageFilterConfig = languageFeature?.language?.languageFilter;

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
  ): Promise<StrongLanguageDto> {
    let strongLanguageConfig: StrongLanguageDto;
    const cacheKey = `guild-${guild.guildId}:feature:strongLanguageConfig`;

    const cachedConfig = await this.redisService.get(cacheKey);

    if (!cachedConfig) {
      const languageFeature = await this.featuresModel.findOne(
        { guildId: guild.guildId },
        { language: 1 },
      );

      strongLanguageConfig = languageFeature?.language?.strongLanguage;

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
}
