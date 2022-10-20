import axios from 'axios';
import { injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';

interface axiosConfig{
    method: string,
    route: string,
    body?: any
}


@injectable()
export class SharedService{
	constructor(){}

	/////Global Axios Config
	async axiosInstance(payload: axiosConfig): Promise<void> {
		const { method, route, body } = payload;
        
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
			.catch(err => {
				console.log(err.message);
			});
	}

	////Extract users and channel info
	async extractGuildInfo(content: any) {
		const guild = new IGuild(
			content.guildId,
			content.channelId,
			content.id,
			content.content,
			content.author.id,
			content.author.bot,
		);

		return guild;
	}
}