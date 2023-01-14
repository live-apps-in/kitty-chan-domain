import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter.service';
import { ActivityType, Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';
import { SharedService } from './shared/shared.service';
import { LoggerService } from './service/logger.service';
import { CommandService } from './service/commands.service';
import { WakeService } from './service/wake.service';
import './config/command_init';
import { FeatureFlagService } from './service/shared/featureFlag.service';
import { PortalService } from './service/portal.service';
import { GamesService } from './service/games/games.service';
import { RPSGameService } from './service/games/RPSGame.service';
import server from '../model/server';
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
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
	){}

	async start() {
		///Connect to Discord Server
		client.on('ready', () => {
			client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			console.log('kitty chan connected 😸');

			  const serverCount = client.guilds.cache.size;
  			  let memberCount = 0;
  			  let botCount = 0;
			
  			client.guilds.cache.forEach(guild => {
    			memberCount += guild.memberCount;
    			botCount += guild.members.cache.filter(member => member.user.bot).size;
  			});

  			console.log(`Connected to ${serverCount} servers and serving ${memberCount + botCount} members`);
				
		});
        
		/////READ Messages & Respond
		client.on('messageCreate', async (message) => {
			///Extract Guild Info
			const guildInfo = await this.sharedService.extractGuildInfo(message);
			
			///Log
			await this.loggerService.log_message_count(guildInfo);
			
			///Validate if Bot message
			if (guildInfo.isBot) return;
			
			///Fetch feature flags
			const featureFlag = await this.featureFlagService.getFeatureFlag(guildInfo);
			if (!featureFlag) return;

			guildInfo.featureFlag = { ...featureFlag.features };

			///Check Portal Intent
			const isPortal = await this.portalService.validate_channel(guildInfo);
			if (isPortal) return;

			///Check Game Intent
			const isGame = await this.gameService.validateGame(guildInfo);
			if (isGame) return;

			///Non-English Detection (Only Detects Hindi)
			if (guildInfo.featureFlag.hindi) {
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

		///Handle bot added to new Server
		client.on('guildCreate', async (guild) => {
			///Register Guild
			await server.insertMany({
				name: guild.name,
				guildId: guild.id
			});

			///Jaga's Discord ID
			const userId = '516438995824017420';

			client.users.fetch(userId)
  			.then(user => {
    			user.send(`I've been added to ${guild.name} - ${guild.id}`);
  			})
  			.catch(console.error);
		});

		///Handle bot added to new Server
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
