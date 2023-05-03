import { injectable } from 'inversify';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { OnInit } from '../jobs/onInit';
import { Client as LiveClient } from '@live-apps/discord';
import { DiscordEvents } from '@live-apps/discord/dist/shared/enum/events.enum';

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
 * LiveCord Discord Client Config
 */
export const liveClient = new LiveClient({
  events: [
    DiscordEvents.guildCreate,
    DiscordEvents.guildDelete,
    DiscordEvents.messageCreate,
    DiscordEvents.guildMemberAdd,
    DiscordEvents.guildMemberRemove,
    DiscordEvents.guildUpdate,
    DiscordEvents.messageDelete,
    DiscordEvents.messageUpdate,
    DiscordEvents.raw,
  ],
  sync: false,
  token: process.env.KITTY_CHAN_TOKEN,
});

@injectable()
export class App {
  /**
   * Planning to migrate from monolith to Events & Domain microservice
   * Discord JS is not optimized at shards level
   * Discord API custom rate-limiter is still experimental
   * Currently focusing on LiveCord and kitty chan gRPC endpoints
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
