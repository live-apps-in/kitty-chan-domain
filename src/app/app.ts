import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter.service';
import { ActivityType, Client, GatewayIntentBits, MessageReaction } from 'discord.js';
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

/**
 * Discord JS lib Client Config
 */
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageReactions,
	],
	shards: 'auto',
});

@injectable()
export class App{
	constructor(
		@inject(TYPES.LanguageFilter) private readonly langFilter: LanguageFilter,
		@inject(TYPES.SharedService) private readonly sharedService: SharedService,
		@inject(TYPES.LoggerService) private readonly loggerService: LoggerService,
		@inject(TYPES.WakeService) private readonly wakeService: WakeService,
		@inject(TYPES.CommandService) private readonly commandService: CommandService,
		@inject(TYPES.FeatureFlagService) private readonly featureFlagService: FeatureFlagService,
		@inject(TYPES.PortalService) private readonly portalService: PortalService,
		@inject(TYPES.GameService) private readonly gameService: GamesService,
		@inject(TYPES.RolesService) private readonly rolesService: RolesService,
		@inject(TYPES.RedisService) private readonly redisService: RedisService,
	){}

	async start() {
		/**
		 * Client on Ready
		 */
		client.on('ready', async() => {
			client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			
			const serverCount = client.guilds.cache.size;
			let memberCount = 0;
			let botCount = 0;
			
			///Loaders
			await new OnInit().bootstrap();
			
			///Log Server Stats
			client.guilds.cache.forEach(guild => {
				memberCount += guild.memberCount;
    			botCount += guild.members.cache.filter(member => member.user.bot).size;
			});
			
			console.log(`Connected to ${serverCount} servers and serving ${memberCount + botCount} members`);
			console.log('kitty chan connected 😸');
			
			setInterval(() => {
				client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			},60000);	
		});

        
		/**
		 * Message Create Event
		 */
		client.on('messageCreate', async (message) => {
			///Extract Guild Info
			const guildInfo = await this.sharedService.extractGuildInfo(message);
			
			///Log
			this.loggerService.log_message_count(guildInfo);
			
			///Validate if Bot message
			if (guildInfo.isBot) return;

			///Fetch feature flags
			const featureFlag = await this.featureFlagService.getFeatureFlag(guildInfo);
			if (!featureFlag) return;

			guildInfo.featureFlag = { ...featureFlag };

			///Check Portal Intent
			const isPortal = await this.portalService.validate_channel(guildInfo);
			if (isPortal) return;

			///Check Game Intent
			const isGame = await this.gameService.validateGame(guildInfo);
			if (isGame) return;

			///Non-English Detection (Only Detects Hindi)
			if (guildInfo?.featureFlag?.hindi) {
				const isNonEnglish = await this.langFilter.non_english_detection(guildInfo);
				if (isNonEnglish) return;
			}

			if (guildInfo?.featureFlag?.strongLanguage) { 
				///Strong Language Detection
				const isStrongLang = await this.langFilter.strong_language_detection(guildInfo);
				if (isStrongLang) return;
			}

			///Commands
			const isCommand = await this.commandService.validateCommand(guildInfo);
			if (isCommand) return;

			///Wake Words
			await this.wakeService.validate(guildInfo);

			///Games
			await this.gameService.call(guildInfo);

			///Log Good Text Count
			await this.loggerService.text_count_logger(guildInfo);

		});


		/**
		 * Message Reaction Add Event
		 */
		client.on('messageReactionAdd', async (reaction: MessageReaction, user) => {
			this.rolesService.setReactionRole(reaction, user);
		});


		/**
		 * All Events from Discord API
		 * Currently using this for Message Reaction Remove
		 */
		client.on('raw', async (event) => {
			if (event.t === 'MESSAGE_REACTION_REMOVE') {
				const guild = await this.sharedService.extractGuildFromRaw(event);
				this.rolesService.removeReactionRole(guild);
			}
		});


		/**
		 * Guild Create Event
		 */
		client.on('guildCreate', async (guild) => {
			///Register Guild
			await server.insertMany({
				name: guild.name,
				guildId: guild.id
			});

			await this.redisService.set(
				`guild:${guild.id}:flags`,
				JSON.stringify({
					strongLanguage: false,
					hindi: false,
					valorant_find_players: false,
					valorant_set_rank: false
				})
			)

			///Jaga's Discord ID
			const userId = '516438995824017420';

			client.users.fetch(userId)
  			.then(user => {
    			user.send(`I've been added to ${guild.name} - ${guild.id}`);
  			})
  			.catch(console.error);
		});


		/**
		 * Guild Delete Event
		 */
		client.on('guildDelete', async (guild) => {
	
			///Jaga's Discord ID
			const userId = '516438995824017420';

			client.users.fetch(userId)
  			.then(user => {
    			user.send(`I've been removed from to ${guild.name} - ${guild.id}`);
  			})
  			.catch(console.error);
		});

		///Login kitty chan
		client.login(process.env.KITTY_CHAN_TOKEN);
	}
}
