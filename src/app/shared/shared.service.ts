import axios from 'axios';
import { Message } from 'discord.js';
import { injectable } from 'inversify';
import { IGuild, IMessageReaction } from '../interface/shared.interface';

interface axiosConfig{
    method: string,
    route: string,
    body?: any
}


@injectable()
export class SharedService{

	/////Global Axios Config
	async axiosInstance(payload: axiosConfig): Promise<any> {
		const { method, route } = payload;
		const headers = {
			Authorization: `Bot ${process.env.KITTY_CHAN_TOKEN}`,
			'content-type': 'application/json'
		};
		const data = {
			...payload.body   
		};

		const axiosConfig: any = {
			method,
			url: `${process.env.DISCORD_API}${route}`,
			headers
		};

		if(['put', 'post', 'patch'].includes(method)) axiosConfig.data = data;

		// console.log(axiosConfig)
		
		let resData: any;
		await axios(axiosConfig)
			.then(res => {
				resData = res.data;
			})
			.catch(err => {
				console.log(err.message);
				// console.log(err.response);
			});
		return resData;
	}

	////Extract users and channel info
	async extractGuildInfo(content: Message) {
		const guild = new IGuild(
			content.guildId,
			content.guild.name,
			content.channelId,
			content.id,
			content.author.id,
			content.author.username,
			content.author.avatar,
			content.content,
			content.author.bot,
			content,
			{}
		);

		return guild;
	}

	////Extract Info from raw events
	async extractGuildFromRaw(event) {
		const isBot = process.env.KITTY_CHAN_ID === event.d.user_id;
		const guild = {
			guildId: event.d.guild_id,
			channelId: event.d.channel_id,
			messageId: event.d.message_id,
			userId: event.d.user_id,
			emoji: event?.d?.emoji,
			isBot
		} as IMessageReaction;

		return guild;
	}

	async filterMentions(guild: IGuild) {
		const mentions = guild.payload.mentions;
		return {
			everyone: mentions.everyone,
			user: mentions.members,
			channel: mentions.channels,
			role: mentions.roles
		};
		
	}
}