import axios from 'axios';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';

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

		const axiosConfig = {
			method,
			url: `${process.env.DISCORD_API}/${route}`,
			data,
			headers
		};
		
		let resData: any;
		await axios(axiosConfig)
			.then(res=> resData = res.data)
			.catch(err => {
				console.log(err.message);
				console.log(err);
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