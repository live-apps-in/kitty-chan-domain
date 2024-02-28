import { Client } from '@live-apps/discord';
import { Provider } from '@nestjs/common';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';

const client = new Client({
  token: process.env.DISCORD_BOT_TOKEN,
  events: [],
  logs: false,
  redisOptions: {
    db: 0,
    host: process.env.REDIS_HOST,
    port: 6379,
    pass: process.env.REDIS_PASS,
  },
});

export const DiscordProvider: Provider = {
  provide: PROVIDER_TYPES.DiscordClient,
  useValue: client,
};
