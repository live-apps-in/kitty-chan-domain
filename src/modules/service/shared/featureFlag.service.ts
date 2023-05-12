import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify.types';
import { RedisService } from '../../../shared/redis.service';
import { IGuild } from '../../interface/shared.interface';
import { ServerRepo } from '../../repository/server.repo';

@injectable()
export class FeatureFlagService {
  constructor(
    @inject(TYPES.ServerRepo) private readonly serverRepo: ServerRepo,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async create_featureFlag(payload: any) {
    await this.serverRepo.create(payload);
  }

  async getFeatureFlag({ guildId }: IGuild) {
    try {
      const redisGuildFF = await this.redisService.get(
        `guild:${guildId}:flags`,
      );

      /**Create Feature flag in Redis if guild is available in MongoDB */
      if (!redisGuildFF) {
        const mongoGuildFF = await this.serverRepo.getByGuildId(guildId);

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
    return this.serverRepo.get();
  }

  async update_featureFlag(_id: Types.ObjectId, payload: any) {
    return this.serverRepo.update(_id, payload);
  }
}
