import { injectable } from 'inversify';
import 'dotenv/config';
import { OnInit } from '../jobs/onInit';
import { Client as LiveClient } from '@live-apps/discord';

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
   * All of sockets listeners are migrated from monolith to Events & Domain microservice
   */
  async start() {
    /**
     * On client bootstrap
     */
    ///Loaders - OnInit
    await new OnInit().bootstrap();
  }
}
