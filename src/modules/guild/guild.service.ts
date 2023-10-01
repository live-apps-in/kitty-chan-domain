import { inject, injectable } from 'inversify';
import {
  IBasicGuild,
  IGuildMember,
} from '../../common/interface/shared.interface';
import Guild from './model/guild.model';
import { TYPES } from '../../core/inversify.types';
import { RolesService } from '../roles/roles.service';
import { RedisService } from '../../common/services/redis.service';
import userModel from './model/user.model';
import { liveClient } from '../app';
import Features from '../features/model/features.model';

@injectable()
export class GuildService {
  constructor(
    @inject(TYPES.RolesService) private readonly rolesService: RolesService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async guildCreate(guild: IBasicGuild) {
    const { guildId, guildName, guildIcon } = guild;

    /**Find or create guild */
    const getServer = await Guild.findOne({ guildId });
    if (getServer) {
      await Guild.updateOne(
        { _id: getServer._id },
        {
          $set: {
            name: guildName,
            icon: guildIcon,
          },
        },
      );

      return;
    }

    await Guild.insertMany({
      name: guildName,
      guildId,
      ownerId: guild.guildOwner,
    });

    /**Create Features for Guild */
    const getFeatures = await Features.findOne({ guildId });

    if (!getFeatures) {
      await Features.insertMany({
        guildId,
      });
    }

    ///Jaga's Discord ID
    const userId = '516438995824017420';

    await liveClient.user.sendMessage(
      userId,
      `Added to ${guild.guildName} - ${guild.guildId}`,
    );
  }

  async guildUpdate(guild: IBasicGuild) {
    const { guildId } = guild;

    const getDiscordGuild = await liveClient.guild.fetch(guildId, {
      ignoreCache: true,
    });
    if (!getDiscordGuild) {
      return;
    }

    await Guild.updateOne(
      { guildId },
      {
        $set: {
          name: getDiscordGuild.name,
          icon: getDiscordGuild.icon,
        },
      },
    );
  }

  async guildDelete(guild: IBasicGuild) {
    const { guildId } = guild;

    ///Remove feature flag in Redis
    await this.redisService.delete(`guild:${guildId}:flags`);

    ///Remove Reaction Role Mongo cache
    await this.rolesService.deleteReactionRolesByGuild(guildId);

    ///Jaga's Discord ID
    const userId = '516438995824017420';

    await liveClient.user.sendMessage(
      userId,
      `Removed from ${guild.guildName} - ${guild.guildId}`,
    );
  }

  async guildMemberCreate(guildMember: IGuildMember) {
    const user = await userModel.findOne({ discordId: guildMember.userId });

    if (user) {
      await userModel.updateOne(
        { _id: user._id },
        {
          $addToSet: { guilds: guildMember.guildId },
        },
      );
    } else {
      await userModel.insertMany({
        name: guildMember.userName,
        discordId: guildMember.userId,
        guilds: [guildMember.guildId],
      });
    }
  }

  async guildMemberDelete(guildMember: IGuildMember) {
    await userModel.updateOne(
      { discordId: guildMember.userId },
      {
        $pull: { guilds: guildMember.guildId },
      },
    );
  }
}
