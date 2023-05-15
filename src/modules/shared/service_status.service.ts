import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { ServerRepo } from '../repository/server.repo';
import { performance } from 'perf_hooks';
import { RedisService } from '../../shared/redis.service';
import { liveClient } from '../app';
import { DiscordEmbeds } from '@live-apps/discord';
import { DiscordEmbedField } from '../../types/discord.types';
import { QueueService } from '../../shared/queue.service';
import { SharedService } from './shared.service';
import { v4 } from 'uuid';

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
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
  ) {}
  async check() {
    const serviceStats: ServiceStats[] = [];

    const mongo = await this.mongo();
    const redis = await this.redis();
    const ff = await this.featureFlag();
    const queue = await this.queue();
    const rest = await this.rest();
    const liveAppsDiscord = await this.liveAppsDiscord();

    serviceStats.push(mongo);
    serviceStats.push(redis);
    serviceStats.push(queue);
    serviceStats.push(ff);
    serviceStats.push(rest);
    serviceStats.push(liveAppsDiscord);

    return serviceStats;
  }

  async discord_command(channelId: string) {
    const serviceStats = await this.check();

    const embeds: DiscordEmbeds = {
      title: 'kitty chan Service Status',
      color: 10181010,
      description: 'Status of all dependant services:',
      fields: [],
      footer: {
        text: `Server Region - Mumbai  |  Live Apps`,
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
        currentRow = [];
      }
    }

    // Add the remaining services if not enough to form a complete row
    if (currentRow.length > 0) {
      embeds.fields?.push(...currentRow);
    }

    await liveClient.message.sendEmbed(channelId, [embeds]);
  }

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

  private async liveAppsDiscord() {
    const start = performance.now();
    const getGuild = await liveClient.guild.fetch(this.guildId, {
      ignoreCache: true,
    });
    const end = performance.now();

    if (!getGuild) {
      return {
        service: 'LiveApps Discord',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'LiveApps Discord',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }

  private async rest() {
    const start = performance.now();
    const rest = await this.sharedService.axiosInstance({
      method: 'get',
      url: this.kittyChanPingUrl,
    });
    const end = performance.now();

    if (!rest) {
      return {
        service: 'REST service',
        isAvailable: false,
        latency: null,
      } as ServiceStats;
    }

    return {
      service: 'REST service',
      isAvailable: true,
      latency: Number((end - start).toFixed(2)),
    } as ServiceStats;
  }
}
