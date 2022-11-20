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
	async axiosInstance(payload: axiosConfig): Promise<void> {
		const { method, route } = payload;
		const headers = {
			Authorization: `Bot ${process.env.KITTY_CHAN_TOKEN}`
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
		
		await axios(axiosConfig)
			// .then(res=> console.log(res))
			.catch(err => {
				console.log(err.message);
				// console.log(err);
			});
	}

	////Extract users and channel info
	async extractGuildInfo(content: Message) {
		const guild = new IGuild(
			content.guildId,
			content.channelId,
			content.id,
			content.author.id,
			content.author.username,
			content.author.avatar,
			content.content,
			content.author.bot,
			content
		);

		return guild;
	}

	// async extractGuildInfoFromInteraction(interaction: ChatInputCommandInteraction) {
	// 	const guild = new IGuild(
	// 		interaction.guildId,
	// 		interaction.channelId,
	// 		interaction.id,
	// 		interaction.author.id,
	// 		interaction.author.username,
	// 		interaction.author.avatar,
	// 		interaction.content,
	// 		interaction.author.bot,
	// 		interaction
	// 	);

	// 	return guild;
	// }
}