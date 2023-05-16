import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { ServerRepo } from '../../repository/server.repo';
import { performance } from 'perf_hooks';
import { RedisService } from '../../../shared/redis.service';
import { liveClient } from '../../app';
import { DiscordEmbeds } from '@live-apps/discord';
import { DiscordEmbedField } from '../../../types/discord.types';
import { QueueService } from '../../../shared/queue.service';
import { SharedService } from './shared.service';
import { GuildService } from '../guild.service';

interface ServiceStats {
  service: string;
  isAvailable: boolean;
  latency: number | null; //ms
}

/**Retrieve Service Availability and Latency */
@injectable()
export class ServiceStatus {
  private guildId = '1031566030507626607';
  private kittyChanPingUrl = 'https://kittychan.jaga.live/ping';

  constructor(
    @inject(TYPES.ServerRepo) private readonly serverRepo: ServerRepo,
    @inject(TYPES.RedisService) private readonly redisService: RedisService,
    @inject(TYPES.QueueService) private readonly queueService: QueueService,
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
  ) {}

  /**Fetch all service latency */
  async check() {
    const serviceStats: ServiceStats[] = [];

    const mongo = await this.mongo();
    const redis = await this.redis();
    const ff = await this.featureFlag();
    const queue = await this.queue();
    const rest = await this.rest();
    const liveCordgRPC = await this.liveCordgRPC();
    const liveAppsDiscordAPI = await this.liveAppsDiscordAPI();
    const liveAppsDiscordCache = await this.liveAppsDiscordCache();

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

  /**Build and send service status to discord channel
   * Used by Commands
   */
  async discord_command(channelId: string) {
    const serviceStats = await this.check();

    const embeds: DiscordEmbeds = {
      title: 'kitty chan Service Status 🛠',
      color: 10181010,
      description: 'Status of all dependent services:',
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
  private async mongo() {
    const start = performance.now();
    const getGuild = await this.serverRepo.getByGuildId(this.guildId);
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
  private async featureFlag() {
    const start = performance.now();
    const getGuildFF = await this.redisService.get(
      `guild:${this.guildId}:flags`,
    );
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
  private async liveAppsDiscordAPI() {
    const start = performance.now();
    const getGuild = await liveClient.guild.fetch(this.guildId, {
      ignoreCache: true,
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
  private async liveAppsDiscordCache() {
    const start = performance.now();
    const getGuild = await liveClient.guild.fetch(this.guildId);
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

  /**REST - Ping API */
  private async rest() {
    const start = performance.now();
    const rest = await this.sharedService.axiosInstance({
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

  /**LiveCord - make a gRPC call */
  private async liveCordgRPC() {
    const start = performance.now();
    const getGuild: any = await this.guildService.getGuildById(this.guildId);
    const end = performance.now();

    if (!getGuild?.name) {
      return {
        service: 'LiveCord gRPC',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'LiveCord gRPC',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }
}