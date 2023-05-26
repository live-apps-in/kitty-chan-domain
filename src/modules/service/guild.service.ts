import { inject, injectable } from 'inversify';
import { IBasicGuild } from '../interface/shared.interface';
import Guild from '../../model/guild.model';
import { TYPES } from '../../core/inversify.types';
import { RolesService } from './roles/roles.service';
import { RedisService } from '../../shared/redis.service';

@injectable()
export class GuildService {
  constructor(
    @inject(TYPES.RolesService) private readonly rolesService: RolesService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async guildCreate(guild: IBasicGuild) {
    const { guildId, guildName } = guild;
    ///Register Guild
    const getServer = await Guild.findOne({ guildId });
    if (getServer) return;

    await Guild.insertMany({
      name: guildName,
      guildId,
    });

    await this.redisService.set(
      `guild:${guildId}:flags`,
      JSON.stringify({
        strongLanguage: false,
        hindi: false,
        valorant_find_players: false,
      }),
    );

    ///Jaga's Discord ID
    const userId = '516438995824017420';

    //TODO - Notify Bot owner
  }

  async guildDelete(guild: IBasicGuild) {
    const { guildId } = guild;

    ///Remove feature flag in Redis
    await this.redisService.delete(`guild:${guildId}:flags`);

    ///Remove Reaction Role Mongo cache
    await this.rolesService.deleteReactionRolesByGuild(guildId);

    ///Jaga's Discord ID
    const userId = '516438995824017420';

    //TODO - Notify Bot owner
  }
}
