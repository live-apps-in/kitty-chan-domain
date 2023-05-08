import { injectable } from 'inversify';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { OnInit } from '../jobs/onInit';
import { Client as LiveClient } from '@live-apps/discord';

/**
 * Discord JS Client Config
 */
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  shards: 'auto',
});

/**
 * LiveApps Discord Client Config
 */
export const liveClient = new LiveClient({
  events: [],
  sync: true,
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
   * This app receives gRPC call from kitty chan events
   */
  async start() {
    /**
     * On client bootstrap
     */
    client.on('ready', async () => {
      client.user.setActivity("people's wishes!", {
        type: ActivityType.Listening,
      });

      ///Loaders - OnInit
      await new OnInit().bootstrap();

      console.log('kitty chan connected 😸');
    });

    ///Login kitty chan
    client.login(process.env.KITTY_CHAN_TOKEN);
  }
}
