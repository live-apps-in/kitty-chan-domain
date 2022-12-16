import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter.service';
import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';
import { SharedService } from './shared/shared.service';
import { LoggerService } from './service/logger.service';
import { CommandService } from './service/commands.service';
import { WakeService } from './service/wake.service';
import './config/command_init';
import { FeatureFlagService } from './service/shared/featureFlag.service';

const client = new Client({
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
	){}

	async start() {
		///Connect to Discord Server
		client.on('ready', () => {
			client.user.setActivity('with Messi 🐐');
			console.log('kitty chan connected 😸');
				
		});
        
		/////READ Messages & Respond
		client.on('messageCreate', async (message) => {
			///Extract Guild Info
			const guildInfo = await this.sharedService.extractGuildInfo(message);
			
			///Validate if Bot message
			if (guildInfo.isBot) return;
			
			///Fetch feature flags
			const featureFlag = await this.featureFlagService.getFeatureFlag(guildInfo);
			if (!featureFlag) return;
			guildInfo.featureFlag = { ...featureFlag.features };

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

			///Log Good Text Count
			await this.loggerService.text_count_logger(guildInfo);

		});

		client.login(process.env.KITTY_CHAN_TOKEN);

	}
}
