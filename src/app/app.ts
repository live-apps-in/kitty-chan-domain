import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter.service';
import { ActivityType, Client, GatewayIntentBits, GuildMember } from 'discord.js';
import { SharedService } from './shared/shared.service';
import { LoggerService } from './service/logger.service';
import { CommandService } from './service/commands.service';
import { WakeService } from './service/wake.service';
import { FeatureFlagService } from './service/shared/featureFlag.service';
import { PortalService } from './service/portal.service';
import { GamesService } from './service/games/games.service';
import server from '../model/server';
import './config/command_init';
import 'dotenv/config';
import { OnInit } from '../jobs/onInit';
import { RolesService } from './service/roles/roles.service';
import { RedisService } from '../shared/redis.service';
import { IGuildMember } from './interface/shared.interface';
import { GuildService } from './service/guild.service';

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

@injectable()
export class App{

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
		client.on('ready', async() => {
			client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			
			///Loaders - OnInit
			await new OnInit().bootstrap();

			console.log('kitty chan connected 😸');
				
		});

		///Login kitty chan
		client.login(process.env.KITTY_CHAN_TOKEN);
	}
}
