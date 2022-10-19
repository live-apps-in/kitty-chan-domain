import { inject, injectable } from 'inversify';
import { TYPES } from '../core/inversify.types';
import { LanguageFilter } from './service/languageFilter';
import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

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
        @inject(TYPES.LanguageFilter) private readonly langFilter: LanguageFilter
	){}

	async start() {
		///Connect to Discord Server
		client.on('ready', () => {
			client.user.setActivity('with ppl who dont like me');
			console.log(client.user.username, 'connected');
		});
        
		/////READ Messages & Respond
		client.on('messageCreate', async(message) => {
			//Validate
			if (message.author.bot) return;
			console.log(message.content);

			///Strong Language Detection
			const isStrongLang = await this.langFilter.strong_language_detection(message.content);
			console.log(isStrongLang);
		});

		client.login(process.env.KITTY_CHAN_TOKEN);

	}
}