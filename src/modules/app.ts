import { injectable } from 'inversify';
import 'dotenv/config';
import { OnInit } from '../jobs/on-init';
import { Client as LiveClient } from '@live-apps/discord';
import container from '../core/inversify.di';
import { EsService } from '../common/services/es.service';
import { TYPES } from '../core/inversify.types';

/**
 * LiveApps Discord Client Config
 */
export const liveClient = new LiveClient({
  events: [],
  redisOptions: {
    host: process.env.REDIS_HOST,
    db: 0,
    port: 6379,
    pass: process.env.REDIS_PASS,
  },
  token: process.env.KITTY_CHAN_TOKEN,
});

@injectable()
export class App {
  /**
   * All sockets listeners are migrated from monolith to Events & Domain microservice
   */
  async start() {
    /**
     * On client bootstrap
     */
    ///Loaders - OnInit
    const esClient = container.get<EsService>(TYPES.EsService);
    await new OnInit(esClient).bootstrap();
  }
}
