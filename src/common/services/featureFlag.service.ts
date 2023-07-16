import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { TYPES } from '../../core/inversify.types';
import { RedisService } from './redis.service';
import { IGuild } from '../interface/shared.interface';
import { GuildRepo } from '../../repository/guild.repo';

@injectable()
export class FeatureFlagService {
  constructor(
    @inject(TYPES.GuildRepo) private readonly guildRepo: GuildRepo,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async create_featureFlag(payload: any) {
    await this.guildRepo.create(payload);
  }

  async getFeatureFlag({ guildId }: IGuild) {
    try {
      const redisGuildFF = await this.redisService.get(
        `guild:${guildId}:flags`,
      );

      /**Create Feature flag in Redis if guild is available in MongoDB */
      if (!redisGuildFF) {
        const mongoGuildFF = await this.guildRepo.getByGuildId(guildId);

        if (mongoGuildFF) {
          await this.redisService.set(
            `guild:${guildId}:flags`,
            JSON.stringify({
              strongLanguage: false,
              hindi: false,
              valorant_find_players: false,
            }),
          );
        }
      }
      return redisGuildFF ? JSON.parse(redisGuildFF) : null;
    } catch (error) {
      return null;
    }
  }

  async viewAllFeatureFlag() {
    return this.guildRepo.get();
  }

  async update_featureFlag(_id: Types.ObjectId, payload: any) {
    return this.guildRepo.update(_id, payload);
  }
}
