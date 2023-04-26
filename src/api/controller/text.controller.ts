import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { liveClient } from '../../modules/app';

@controller('/client')
export class TextController {
  @httpPost('/text')
  async sendText(req: Request) {
    const { message, channelId } = req.body;

    await liveClient.message.send(channelId, message);
    return {
      message: 'Message sent',
    };
  }
}
