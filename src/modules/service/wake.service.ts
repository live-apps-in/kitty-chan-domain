import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { sad_phrase_response_builder } from '../content/sad_phrase.content';
import { sad_phrase } from '../data/wake_phrase/sad_phrase';
import { IGuild } from '../../common/interface/shared.interface';
import { UtilityService } from './shared/utils.service';
import { liveClient } from '../app';

@injectable()
export class WakeService {
  constructor(
    @inject(TYPES.UtilityService)
    private readonly utilityService: UtilityService,
  ) {}

  async validate(guild: IGuild) {
    const messageChunk = guild.messageContent.split(' ');

    ///Detect Sad phrase
    const detectSadPhrase = await this.detect_sad_phrase(messageChunk, guild);
    if (detectSadPhrase) return;

    return;
  }

  ////Detect sad phrase
  private async detect_sad_phrase(messageChunk: string[], guild: IGuild) {
    ////Check Wake Phrase
    const { isMatch, libIndex } = await this.utilityService.match_wake_phrase(
      messageChunk,
      sad_phrase,
    );
    if (!isMatch) return;
    const buildResponse = await sad_phrase_response_builder(libIndex);

    await liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      buildResponse,
    );
    return true;
  }
}
