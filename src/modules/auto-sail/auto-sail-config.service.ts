import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from '../../common/services/redis.service';
import autoSailModel from './model/auto-sail.model';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { AutoSailService } from './auto-sail.service';

@injectable()
export class AutoSailConfigService {
  constructor(
    @inject(TYPES.AutoSailService)
    private readonly autoSailService: AutoSailService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async process(payload: any, autoSailTriggerEvent: string) {
    const autoSailConfig = await this.getConfig(payload.guildId);

    if (!autoSailConfig.length) {
      return false;
    }

    await this.autoSailService.automate(
      payload,
      autoSailTriggerEvent,
      autoSailConfig,
    );
  }

  private async getConfig(guildId: string) {
    const guildConfigKey = `guild-${guildId}-features-autoSailConfig`;
    const getConfigCache = await this.redisService.get(guildConfigKey);
    let config: AutoSailConfigDto[] = getConfigCache
      ? JSON.parse(getConfigCache)
      : [];

    if (!getConfigCache) {
      const fetchConfig = await autoSailModel
        .find({ guildId, isActive: true })
        .lean()
        .then((data) => data.map((e) => e?.config));

      if (fetchConfig.length) {
        await this.redisService.setWithExpiry(
          guildConfigKey,
          JSON.stringify(fetchConfig),
          30,
        );

        config = fetchConfig;
      }
    }

    return config;
  }
}
