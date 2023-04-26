import { injectable } from 'inversify';
import { TEXT } from '../types/text.types';
import { liveClient } from '../../modules/app';

@injectable()
export class AlexaService {
  async textServer(message: string, username: string, messageType: string) {
    const channelId = '928902191983517717'; ///Need to change to dynamic - TODO

    const buildMessage = await this.buildMessage(
      message,
      username,
      messageType,
    );

    liveClient.message.send(channelId, buildMessage);
  }

  private async buildMessage(
    message: string,
    username: string,
    messageType: string,
  ) {
    let buildMessage: string;

    switch (messageType) {
      case TEXT.message:
        buildMessage = `[ ${username} from Alexa ]: ${message}`;
        break;

      case TEXT.playGame:
        buildMessage = `[ ${username} from Alexa ]: ${username} wants to play VALORANT now!`;
        break;

      default:
        break;
    }

    return buildMessage;
  }
}
