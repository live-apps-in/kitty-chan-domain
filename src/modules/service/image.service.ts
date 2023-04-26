import axios from 'axios';
import { injectable } from 'inversify';
import { image_content } from '../content/image';
import { IGuild } from '../interface/shared.interface';
import { liveClient } from '../app';

@injectable()
export class ImageService {
  async validate(messageChunk: string[], guild: IGuild) {
    ///If params undefined
    if (!messageChunk[2]) {
      liveClient.message.reply(
        guild.channelId,
        guild.messageId,
        image_content.missing_config,
      );
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
          url: `https://source.unsplash.com/random/1920x1080?${query}`,
        };
        break;

      default:
        liveClient.message.reply(
          guild.channelId,
          guild.messageId,
          'Invalid Size. Try *mobile* or *pc*',
        );
        return;
    }

    await this.random(imageConfig, guild);
  }

  private async random(imageConfig: any, guild: IGuild) {
    const unsplash = await axios.get(imageConfig.url, {
      responseType: 'arraybuffer',
    });

    // response.request.res.responseUrl
    const randomUrl = unsplash?.request?.res.responseUrl;
    if (!randomUrl) {
      const content =
        'Sorry, Live Apps - Image Services are currently Offline!';

      liveClient.message.reply(guild.channelId, guild.messageId, content);
      return;
    }

    liveClient.message.reply(guild.channelId, guild.messageId, randomUrl);

    return;
  }
}
