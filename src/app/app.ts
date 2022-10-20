import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter.service';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import 'dotenv/config';
import { SharedService } from './shared/shared.service';

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
		@inject(TYPES.SharedService) private readonly sharedService: SharedService
	){}

	async start() {
		///Connect to Discord Server
		client.on('ready', () => {
			client.user.setActivity('with ppl who dont like me');
			console.log('kitty chan connected');
		});
        
		/////READ Messages & Respond
		client.on('messageCreate', async(message) => {
			///Extract Guild Info
			const guildInfo = await this.sharedService.extractGuildInfo(message);

			///Validate if Bot message
			if(guildInfo.isBot) return;
			
			///Non-English Detection (Only Detects Hindi)
			const isNonEnglish = await this.langFilter.non_english_detection(guildInfo);
			if (isNonEnglish) return;

			///Strong Language Detection
			const isStrongLang = await this.langFilter.strong_language_detection(guildInfo);

		});

		client.login(process.env.KITTY_CHAN_TOKEN);

	}
}