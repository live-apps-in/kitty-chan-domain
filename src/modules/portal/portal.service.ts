import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { IGuild, IGuildMessage } from '../../common/interface/shared.interface';
import PortalRoom from './model/portal-room.model';
import { SharedService } from '../../common/services/shared.service';
import { discordClient } from '../app';
import { PortalMsg } from '../../common/messages/portal/portal';
import { FeaturesRepo } from '../features/repo/features.repo';
import { FeaturesEnum } from '../features/enum/features.enum';
import { RedisService } from '../../common/services/redis.service';

@injectable()
export class PortalService {
  constructor(
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
    @inject(TYPES.FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
  ) {}

  //VALIDATION
  async validate(messageChunk: string[], guild: IGuild) {
    if (messageChunk[2] === 'set') {
      await this.setPortal(guild);
    }
  }

  //Validate Channel
  async validate_channel(guild: IGuildMessage) {
    //Check if portal command
    const messageChunk = guild.plainMessage.split(' ');
    if (messageChunk[1] === 'portal') return;

    //Fetch Portal config cache
    const portalConfig = JSON.parse(
      await this.redisService.get(`guild-${guild.guildId}:feature:portal`),
    );

    if (
      !portalConfig?.isActive ||
      portalConfig?.channelId !== guild.channelId
    ) {
      return;
    }

    /**Check for active portal members
     * Todo - move to Redis
     */
    const portal = await PortalRoom.findOne({
      'guilds.guildId': guild.guildId,
    });
    if (portal?.guilds?.length <= 1) return;

    ///Check if message contains mentions
    const { hasMention } = guild.mentions;
    if (hasMention) {
      await this.reply(PortalMsg.MENTION_WARN, guild);
      return;
    }

    //Check if message contains attachments
    if (guild.attachments && guild.attachments.length !== 0) {
      await this.reply(PortalMsg.ATTACHMENT_WARN, guild);
      return;
    }

    //Check if message contains website links
    const { isLink, isTrustable, domain } =
      await this.sharedService.filterWebLinks(guild);
    if (isLink && !isTrustable) {
      await this.reply(PortalMsg.URL_WARN, guild);
      return;
    }

    //Notify Other Portal Members
    const getSessionGuild = await this.getSessionMembers(guild);
    if (!getSessionGuild || getSessionGuild.length === 0) return;

    getSessionGuild.map((e) => {
      if (domain === 'tenor.com') {
        e.message = `[ ${guild.username} from **${guild.guildName}** ]: ${guild.plainMessage} \n`;
      } else {
        e.message = `[ ${guild.username} from **${guild.guildName}** ]: ${guild.plainMessage}`;
      }
    });

    await this.message(getSessionGuild);
    return true;
  }

  ///Set current channel as Portal
  private async setPortal(guild: IGuild) {
    await this.featuresRepo.updateSingleFeature(
      guild.guildId,
      FeaturesEnum.PORTAL,
      {
        channelId: guild.channelId,
      },
    );

    await this.reply(PortalMsg.CHANNEL_SET, guild);
  }

  private async getSessionMembers(guild: IGuild) {
    const portal = await PortalRoom.findOne({
      'guilds.guildId': guild.guildId,
    });
    if (!portal) return [];

    const guilds: any[] = [];

    for (let index = 0; index < portal.guilds.length; index++) {
      const e = portal.guilds[index];

      if (e.guildId !== guild.guildId) {
        guilds.push({
          guildName: e.name,
          guildId: e.guildId,
          channelId: e.channelId,
        });
      }
    }

    return guilds;
  }

  //Common Reply Handler
  private async reply(content: string, guild: IGuild) {
    await discordClient.message.reply(
      guild.channelId,
      guild.messageId,
      content,
    );
    return;
  }

  private async message(guilds: any[]) {
    guilds.map(async (e) => {
      await discordClient.message.send(e.channelId, e.message);
    });
  }
}
