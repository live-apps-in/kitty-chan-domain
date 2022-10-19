import { injectable } from 'inversify';
import { Client, GatewayIntentBits } from 'discord.js';
import { bad_words } from '../data/strong_language';


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
});

@injectable()
export class LanguageFilter {
	constructor() { }
    
	////Strong Language Detection
	async strong_language_detection(message: string): Promise<boolean> {
		message = message.toLowerCase().trim();
		const messageChunk: string[] = message.split(' ');
		let isStrongLanguage = false;

		messageChunk.map((e) => {
			if (bad_words.includes(e)) isStrongLanguage = true;
		});

		return isStrongLanguage;
	}
}