import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { GuildRepo } from '../../repository/guild.repo';
import { performance } from 'perf_hooks';
import { RedisService } from './redis.service';
import { liveClient } from '../../modules/app';
import { DiscordEmbeds } from '@live-apps/discord';
import { DiscordEmbedField } from '../../types/discord.types';
import { QueueService } from './queue.service';
import { IGuildMessage } from '../interface/shared.interface';
import { AxiosService } from './axios.service';

interface ServiceStats {
  service: string;
  isAvailable: boolean;
  latency: number | null; //ms
}

/**Retrieve Service Availability and Latency */
@injectable()
export class ServiceStatus {
  private kittyChanPingUrl = 'https://api.kittychan.live/';
  private DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

  constructor(
    @inject(TYPES.GuildRepo) private readonly guildRepo: GuildRepo,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
    @inject(TYPES.QueueService) private readonly queueService: QueueService,
    @inject(TYPES.AxiosService) private readonly axiosService: AxiosService,
  ) {}

  /**Fetch all service latency */
  async check(guildId: string) {
    const serviceStats: ServiceStats[] = [];

    const mongo = await this.mongo(guildId);
    const redis = await this.redis();
    const ff = await this.featureFlag(guildId);
    const queue = await this.queue();
    const rest = await this.rest();
    const liveCordgRPC = await this.liveCordgRPC();
    const liveAppsDiscordAPI = await this.liveAppsDiscordAPI(guildId);
    const liveAppsDiscordCache = await this.liveAppsDiscordCache(guildId);

    serviceStats.push(mongo);
    serviceStats.push(redis);
    serviceStats.push(queue);
    serviceStats.push(ff);
    serviceStats.push(rest);
    serviceStats.push(liveCordgRPC);
    serviceStats.push(liveAppsDiscordAPI);
    serviceStats.push(liveAppsDiscordCache);

    return serviceStats;
  }

  /** */
  async validateCommand({ guildId, channelId, messageContent }: IGuildMessage) {
    const message = messageContent.trim().toLowerCase();
    const messageChunk = message.split(' ');

    ///Check if kitty chan tagged
    if (messageChunk[0] !== `<@${this.DISCORD_CLIENT_ID}>`) return false;

    /**Service Availability */
    if (messageChunk[1] === 'ping') {
      await this.discord_command(guildId, channelId);
      return true;
    }

    return false;
  }

  /**Build and send service status to discord channel
   * Used by Commands
   */
  async discord_command(guildId: string, channelId: string) {
    const serviceStats = await this.check(guildId);

    const embeds: DiscordEmbeds = {
      title: 'kitty chan Service Stats 🛠',
      color: 10181010,
      description: `kitty chan tries fetching info from all dependent services connected to your 
Guild (Discord Server) - \`${guildId}\`

Certain features won't work unless kitty chan can access these services. 💡`,
      fields: [],
      footer: {
        text: `Server Region - Mumbai  |  Live Apps 💜`,
      },
    };

    const servicesPerRow = 3;
    let currentRow: DiscordEmbedField[] = [];

    for (const stats of serviceStats) {
      const { service, isAvailable, latency } = stats;

      let statusEmoji = '❌';

      if (isAvailable) {
        statusEmoji = '✨';
      }

      let latencyText = 'N/A';
      if (latency !== null) {
        latencyText = `${latency.toFixed(2)} ms`;
      }

      const serviceField: DiscordEmbedField = {
        name: `${service}`,
        value: `${statusEmoji} Delay: ${latencyText}`,
        inline: true,
      };

      currentRow.push(serviceField);

      if (currentRow.length === servicesPerRow) {
        embeds.fields?.push(...currentRow);
        embeds.fields?.push({ name: '', value: '' }); // Add an empty field for spacing
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      embeds.fields?.push(...currentRow);
      embeds.fields?.push({ name: '', value: '' }); // Add an empty field for spacing
    }

    await liveClient.message.sendEmbed(channelId, [embeds]);
  }

  /**MongoDB - Check by fetching home guild */
  private async mongo(guildId: string) {
    const start = performance.now();
    const getGuild = await this.guildRepo.getByGuildId(guildId);
    const end = performance.now();

    if (!getGuild) {
      return {
        service: 'MongoDB',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'MongoDB',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**Redis - Check by Redis PING*/
  private async redis() {
    const start = performance.now();
    const getGuildFF = await this.redisService.ping();
    const end = performance.now();

    if (!getGuildFF) {
      return {
        service: 'Redis',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'Redis',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**FeatureFlag - Check by fetching home guild Feature Flag*/
  private async featureFlag(guildId: string) {
    const start = performance.now();
    const getGuildFF = await this.redisService.get(`guild:${guildId}:flags`);
    const end = performance.now();

    if (!getGuildFF) {
      return {
        service: 'FeatureFlag',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'FeatureFlag',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**RabbitMQ - pub/sub ping queue */
  private async queue() {
    //RabbitMQ currently down
    return {
      service: 'RabbitMQ',
      isAvailable: false,
      latency: null,
    } as ServiceStats;
    const start = performance.now();
    const pubSub = await this.queueService.ping('kitty_chan_domain_queue');
    const end = performance.now();

    if (!pubSub) {
      return {
        service: 'RabbitMQ',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'RabbitMQ',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**LiveApps Discord - API call */
  private async liveAppsDiscordAPI(guildId: string) {
    const start = performance.now();
    const getGuild = await liveClient.guild.fetch(guildId, {
      ignoreCache: true,
      expiry: 3600,
    });
    const end = performance.now();

    if (!getGuild) {
      return {
        service: 'LiveApps Discord (API)',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'LiveApps Discord (API)',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**LiveApps Discord - Fetch Cache */
  private async liveAppsDiscordCache(guildId: string) {
    const start = performance.now();
    const getGuild = await liveClient.guild.fetch(guildId, {
      expiry: 3600,
    });
    const end = performance.now();

    if (!getGuild) {
      return {
        service: 'LiveApps Discord (Cache)',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'LiveApps Discord (Cache)',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**REST - kitty chan API */
  private async rest() {
    const start = performance.now();
    const rest = await this.axiosService.axiosInstance({
      method: 'get',
      url: this.kittyChanPingUrl,
    });
    const end = performance.now();

    if (!rest) {
      return {
        service: 'REST Service',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'REST Service',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  /**LiveCord - make a gRPC call
   * LiveCord microservice is deprecated
   */
  private async liveCordgRPC() {
    return {
      service: 'LiveCord gRPC (Deprecated)',
      isAvailable: false,
      latency: null,
    } as ServiceStats;
  }
}
