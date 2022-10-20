import { injectable, inject } from 'inversify';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { bad_words } from '../data/strong_language';
import { hinglish_words } from '../data/hinglish';
import { TYPES } from '../../core/inversify.types';
import { ResponseService } from './response.service';
import { SharedService } from '../shared/shared.service';
import { IGuild } from '../interface/shared.interface';
import { REPLY } from '../enum/reply';
require('dotenv/config');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
	],
});


@injectable()
export class LanguageFilter {
	constructor(
		@inject(TYPES.ResponseService) private readonly responseService: ResponseService,
		@inject(TYPES.SharedService) private readonly sharedService: SharedService
	) { }
    
	///Non-English Detection
	async non_english_detection(guild: IGuild): Promise<boolean>{
		let {messageContent} = guild;
		messageContent = messageContent.toLowerCase().trim();
		const messageChunk = messageContent.split(' ');
		let isNonEnglish = false;
		
		messageChunk.map((e) => {
			if (hinglish_words.includes(e)) isNonEnglish = true;
		});

		await this.responseService.respond({
			type: REPLY.sendMessage,
			guild,
			body: {
				content: guild.messageContent
			}
		});
		
		return isNonEnglish;
	}

	///Strong Language Detection
	async strong_language_detection(guild: IGuild): Promise<boolean> {
		let { messageContent } = guild;
		messageContent = messageContent.toLowerCase().trim();
		const messageChunk: string[] = messageContent.split(' ');
		let isStrongLanguage = false;

		messageChunk.map((e) => {
			if (bad_words.includes(e)) isStrongLanguage = true;
		});
		
		return isStrongLanguage;
	}
    

	///Rice ball detection
	async rice_ball_detection(reaction: string): Promise<any> {
		
	}
}