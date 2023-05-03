import { inject, injectable } from 'inversify';
import { liveCordgRPC } from '../../microservice/gRPC/grpcClient';
import { IBasicGuild, IGuildMember } from '../interface/shared.interface';
import Server from '../../model/server';
import { client } from '../app';
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
    const getServer = await Server.findOne({ guildId });
    if (getServer) return;

    await Server.insertMany({
      name: guildName,
      guildId,
    });

    await this.redisService.set(
      `guild:${guild.guildId}:flags`,
      JSON.stringify({
        strongLanguage: false,
        hindi: false,
        valorant_find_players: false,
      }),
    );

    ///Jaga's Discord ID
    const userId = '516438995824017420';

    client.users
      .fetch(userId)
      .then((user) => {
        user.send(`I've been added to ${guildName} - ${guildId}`);
      })
      .catch(console.error);
  }

  async guildDelete(guild: IBasicGuild) {
    const { guildId, guildName } = guild;

    ///Remove feature flag in Redis
    await this.redisService.delete(`guild:${guildId}:flags`);

    ///Remove Reaction Role Mongo cache
    await this.rolesService.deleteReactionRolesByGuild(guildId);

    ///Jaga's Discord ID
    const userId = '516438995824017420';
    client.users
      .fetch(userId)
      .then((user) => {
        user.send(`I've been removed from to ${guildName} - ${guildId}`);
      })
      .catch(console.error);
  }

  async syncCreateMemberWithLiveCord(guild: IGuildMember) {
    const { guildId, userId } = guild;
    liveCordgRPC.syncCreateGuildMember(
      {
        guildId,
        userId,
      },
      (err, res) => {},
    );
  }

  async syncRemoveMemberWithLiveCord(guild: IGuildMember) {
    const { guildId, userId } = guild;
    liveCordgRPC.syncRemoveGuildMember(
      {
        guildId,
        userId,
      },
      (err, res) => {},
    );
  }
}
