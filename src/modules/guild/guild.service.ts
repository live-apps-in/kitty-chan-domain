import { Client } from '@live-apps/discord';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { DiscordPresenceStatus } from 'src/common/enum/discord-presence.enum';
import {
  IBasicGuild,
  IGuildMember,
  IGuildPresence,
} from 'src/common/interface/guild.interface';
import { RedisService } from 'src/common/services/connectivity/redis.service';
import { Features } from 'src/modules/features/model/features.model';
import { Guild } from 'src/modules/guild/models/guild.model';
import { User } from 'src/modules/user/models/user.model';

@Injectable()
export class GuildService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Features.name) private readonly featuresModel: Model<Features>,
  ) {}

  async guildCreate(guild: IBasicGuild) {
    const { guildId, guildName, guildIcon } = guild;

    /**Add guildId to Redis cache */
    await this.redisService.addToSet('kittychan-guildIds', guildId);

    /**Find or create guild */
    const getServer = await this.guildModel.findOne({ guildId });
    if (getServer) {
      await this.guildModel.updateOne(
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

    await this.guildModel.insertMany({
      name: guildName,
      guildId,
      ownerId: guild.guildOwner,
      membersCount: guild.guildMembersCount,
    });

    /**Create Features for Guild */
    const getFeatures = await this.featuresModel.findOne({ guildId });

    if (!getFeatures) {
      await this.featuresModel.insertMany({
        guildId,
      });
    }
  }

  async guildUpdate(guild: IBasicGuild) {
    const { guildId } = guild;

    const getDiscordGuild = await this.discordClient.guild.fetch(guildId, {
      ignoreCache: true,
    });
    if (!getDiscordGuild) {
      return;
    }

    await this.guildModel.updateOne(
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
    const user = await this.userModel.findOne({
      discordId: guildMember.userId,
    });

    if (user) {
      await this.userModel.updateOne(
        { _id: user._id },
        {
          $addToSet: { guilds: guildMember.guildId },
        },
      );
    } else {
      await this.userModel.insertMany({
        name: guildMember.userName,
        discordId: guildMember.userId,
        guilds: [guildMember.guildId],
      });
    }

    await this.guildModel.updateOne(
      { guildId: guildMember.guildId },
      {
        $inc: { membersCount: 1 },
      },
    );
  }

  async guildMemberDelete(guildMember: IGuildMember) {
    await Promise.all([
      this.userModel.updateOne(
        { discordId: guildMember.userId },
        {
          $pull: { guilds: guildMember.guildId },
        },
      ),
      this.guildModel.updateOne(
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

    await this.userModel.updateOne(
      { 'discord.id': userId },
      {
        $set: updatedPresence,
      },
    );
  }
}
