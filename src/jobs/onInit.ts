import { client } from '../app/app';
import DataLibs from '../model/data_libs.model';
import ReactionRoles from '../model/reaction_roles.model';
import server from '../model/server';
import redisClient from '../database/redis';
/**
 * Data Libs
 */
export let bad_words = [];
export let hinglish_words = [];
export class OnInit{
	async bootstrap() {
		await this.loadReactionRoles();
		await this.loadDataLibs();
	}
	
	/**
	 * Fetch Reaction Role Messages and cache
	 */
	private async loadReactionRoles() {
		console.log('Loading Reaction Roles Cache');
		const messages = await ReactionRoles.find({}, { messageId: 1, channelId: 1 });
		for (const message of messages) {
			const channel: any = await client.channels.fetch(message.channelId);
			await channel.messages.fetch(message.messageId);
		}
	}

	/**
	 * Load Content Library
	 */
	private async loadDataLibs() {
		const data_libs = await DataLibs.find({});

		data_libs.map(e => {
			if (e.name === 'strong_language') bad_words = e.data;
			if (e.name === 'hindi') hinglish_words = e.data;
		});
		
	}
}