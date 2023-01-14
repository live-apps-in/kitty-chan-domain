import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { client } from '../app';
import { image_content } from '../content/image';
import { REPLY } from '../enum/reply';
import { IGuild } from '../interface/shared.interface';
import { ResponseService } from './shared/response.service';

@injectable()
export class imageService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) { }
    
	async validate(messageChunk: string[], guild: IGuild) {
		///If params undefined
		if (!messageChunk[2]) {
			await this.responseService.replyMessage(image_content.missing_config, guild);
			return;
		}

		let imageConfig = {};
		const query = messageChunk[3] || '';

		switch (messageChunk[2]) {
		case 'mobile':
			imageConfig = {
				imageSize: 'mobile',
				tag: messageChunk[4],
				url: `https://source.unsplash.com/random/320x480?${query}`,
			};
			break;
		case 'pc':
			imageConfig = {
				imageSize: 'pc',
				tag: messageChunk[4],
				url: `https://source.unsplash.com/random/1920x1080?${query}`
			};
			break;
        
		default:
			await this.responseService.replyMessage('Invalid Size. Try *mobile* or *pc*', guild);
			return;
		}
        
		await this.random(imageConfig, guild);

	}

	private async random(imageConfig: any, guild: IGuild) {
        
        
		const unsplash = await axios.get(imageConfig.url, { responseType: 'arraybuffer' });
        
		// response.request.res.responseUrl
		const randomUrl = unsplash?.request?.res.responseUrl;
		if (!randomUrl) {
			await this.responseService.replyMessage('Sorry, Live Apps - Image Services are currently Offline!', guild);
			return;
		}

		await this.responseService.respond({
			type: REPLY.sendMessage,
			guild: guild,
			body: {
				content: randomUrl,
				message_reference: {
					message_id: guild.messageId
				},
			}
		});

		return;
	}
}