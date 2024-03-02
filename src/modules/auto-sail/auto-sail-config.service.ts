import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { AutoSailService } from './auto-sail.service';
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/common/services/connectivity/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoSail } from 'src/modules/auto-sail/models/auto-sail.model';

@Injectable()
export class AutoSailConfigService {
  constructor(
    @Inject(AutoSailService)
    private readonly autoSailService: AutoSailService,
    @Inject(RedisService) private readonly redisService: RedisService,
    @InjectModel('auto_sail') private readonly autoSailModel: Model<AutoSail>,
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
      const fetchConfig = await this.autoSailModel
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
