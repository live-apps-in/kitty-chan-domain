import { inject, injectable } from 'inversify';
import { ConversationRepository } from '../../../api/repository/conversation.repo';
import { TYPES } from '../../../core/inversify.types';
import { randomNumber } from '../../../utils/calc';
import { IGuild } from '../../interface/shared.interface';
import { UtilityService } from '../shared/utils.service';
import { liveClient } from '../../app';

@injectable()
export class ConversationService {
  constructor(
    @inject(TYPES.UtilityService) private readonly utilService: UtilityService,
    @inject(TYPES.ConversationRepository)
    private readonly conversationRepo: ConversationRepository,
  ) {}
  async filter(messageChunk: string[], cleanMessage: string, guild: IGuild) {
    const matchWakePhrase: any = await this.conversationRepo.regex_phrase(
      cleanMessage,
    );
    if (!matchWakePhrase) return;

    const matchPhraseChunk = matchWakePhrase.phrase.split(' ');
    const resPhraseIds = matchWakePhrase.resPhraseId;
    let resPhraseId;
    let resPhrase;

    ///Validate Full Match
    const validatePhraseMatch = await this.utilService.match_wake_phrase_db(
      messageChunk,
      matchPhraseChunk,
    );
    if (!validatePhraseMatch.isMatch) return;

    ///Randomize response document
    if (resPhraseIds === 1) {
      resPhraseId = resPhraseIds[0];
    } else {
      const randomResponse = randomNumber(1, resPhraseIds.length);
      resPhraseId = resPhraseIds[randomResponse - 1];
    }

    ///Randomize response from document
    const getResPhrase = await this.conversationRepo.get_convo_res_by_id(
      resPhraseId,
    );
    if (!getResPhrase?.phrase) return;

    if (getResPhrase.phrase.length === 1) {
      resPhrase = getResPhrase.phrase[0];
    } else {
      const randomResponse = randomNumber(1, getResPhrase.phrase.length);
      resPhrase = getResPhrase.phrase[randomResponse - 1];
    }

    if (!resPhrase) return;
    return this.reply(resPhrase, guild);
  }

  private async reply(phrase: string, guild: IGuild) {
    liveClient.message.reply(guild.channelId, guild.messageId, phrase);

    return true;
  }
}
