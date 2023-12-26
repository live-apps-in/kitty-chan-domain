import { inject, injectable } from 'inversify';
import {
  IBasicGuild,
  IGuildMember,
  IGuildPresence,
} from '../../common/interface/shared.interface';
import Guild from './model/guild.model';
import { TYPES } from '../../core/inversify.types';
import { RolesService } from '../roles/roles.service';
import { RedisService } from '../../common/services/redis.service';
import User from './model/user.model';
import { liveClient } from '../app';
import Features from '../features/model/features.model';
import { DiscordPresenceStatus } from '../../common/enum/discord-presence.enum';

@injectable()
export class GuildService {
  constructor(
    @inject(TYPES.RolesService) private readonly rolesService: RolesService,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  async guildCreate(guild: IBasicGuild) {
    const { guildId, guildName, guildIcon } = guild;

    /**Add guildId to Redis cache */
    await this.redisService.addToSet('kittychan-guildIds', guildId);

    /**Find or create guild */
    const getServer = await Guild.findOne({ guildId });
    if (getServer) {
      await Guild.updateOne(
        { _id: getServer._id },
        {
          $set: {
            name: guildName,
            icon: guildIcon,
            membersCount: guild.guildMembersCount,
          },
        },
      );

      return;
    }

    await Guild.insertMany({
      name: guildName,
      guildId,
      ownerId: guild.guildOwner,
      membersCount: guild.guildMembersCount,
    });

    /**Create Features for Guild */
    const getFeatures = await Features.findOne({ guildId });

    if (!getFeatures) {
      await Features.insertMany({
        guildId,
      });
    }
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

    await Promise.all([
      /**Add guildId to Redis cache */
      this.redisService.removeFromSet('kittychan-guildIds', guildId),

      /**Remove feature flag in Redis */
      this.redisService.delete(`guild:${guildId}:flags`),
    ]);
  }

  async guildMemberCreate(guildMember: IGuildMember) {
    const user = await User.findOne({ discordId: guildMember.userId });

    if (user) {
      await User.updateOne(
        { _id: user._id },
        {
          $addToSet: { guilds: guildMember.guildId },
        },
      );
    } else {
      await User.insertMany({
        name: guildMember.userName,
        discordId: guildMember.userId,
        guilds: [guildMember.guildId],
      });
    }

    await Guild.updateOne(
      { guildId: guildMember.guildId },
      {
        $inc: { membersCount: 1 },
      },
    );
  }

  async guildMemberDelete(guildMember: IGuildMember) {
    await Promise.all([
      User.updateOne(
        { discordId: guildMember.userId },
        {
          $pull: { guilds: guildMember.guildId },
        },
      ),
      Guild.updateOne(
        { guildId: guildMember.guildId },
        {
          $inc: { membersCount: -1 },
        },
      ),
    ]);
  }

  async guildPresenceUpdate({ status, activities, userId }: IGuildPresence) {
    const updatedPresence = {
      activityStatus: status,
      activities: status !== DiscordPresenceStatus.OFFLINE ? activities : [],
    };

    await User.updateOne(
      { 'discord.id': userId },
      {
        $set: updatedPresence,
      },
    );
  }
}
