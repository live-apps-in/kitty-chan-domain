import { injectable, inject } from 'inversify';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { bad_words } from '../data/strong_language';
import { hinglish_words } from '../data/hinglish';
import { TYPES } from '../../core/inversify.types';
import { ResponseService } from './response.service';
import { IGuild } from '../interface/shared.interface';
import { REPLY } from '../enum/reply';
import { ViolationRepository } from '../repository/violation.repo';
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
		@inject(TYPES.ViolationRepository) private readonly violationRepo: ViolationRepository
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

		if (isNonEnglish) {
			
			await this.responseService.respond({
				type: REPLY.addReaction,
				guild,
				body: {
					emoji: '%E2%9A%A0%EF%B8%8F'
				}
			});
		}

		
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

		if (isStrongLanguage) {
			await this.responseService.respond({
				type: REPLY.addReaction,
				guild,
				body: {
					emoji: '%E2%9A%A0%EF%B8%8F'
				}
			});

			///Log Violation
			const getViolation = await this.violationRepo.countViolationByType(guild.userId, 'strong_language');
			if (getViolation === 0) {
				await this.violationRepo.create({ userId: guild.userId, type: 'strong_language' });
			} else {
				await this.violationRepo.update(guild.userId, 'strong_language');
			}
		}
		
		return isStrongLanguage;
	}

}