import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { find_valo_unranked_template } from '../content/rank.content';
import { sad_phrase_response_builder } from '../content/sad_phrase.content';
import {
  valorant_find_player_comp,
  valorant_find_player_unranked,
} from '../data/valorant/valorant_call';
import { sad_phrase } from '../data/wake_phrase/sad_phrase';
import {
  valorant_call_signs
} from '../data/wake_words/valorant';
import { IGuild } from '../interface/shared.interface';
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

    ///Find Valorant Players
    if (guild?.featureFlag?.valorant_find_players) {
      const isFindValPlayerCommand = await this.find_val_players(
        messageChunk,
        guild,
      );
      if (isFindValPlayerCommand) return;
    }

    ///Detect Sad phrase
    const detectSadPhrase = await this.detect_sad_phrase(messageChunk, guild);
    if (detectSadPhrase) return;

    return;
  }

  ///Detect phrase for VALORANT Ranked and Unranked
  private async find_val_players(messageChunk: string[], guild: IGuild) {
    let isValidCalSign = false;
    const isComp = false;
    messageChunk.map((e) => {
      if (valorant_call_signs.includes(e.toLowerCase())) isValidCalSign = true;
    });

    ///Return if no match
    if (!isValidCalSign) return false;

    ///Check for Wake words
    const valorant_wake_sentence: string[][] = isComp
      ? valorant_find_player_comp
      : valorant_find_player_unranked;
    const { isMatch } = await this.utilityService.match_wake_phrase(
      messageChunk,
      valorant_wake_sentence,
    );

    if (!isMatch) return false;
    ///Notify content for Unranked and Comp
    const replyContent = find_valo_unranked_template(guild);

    liveClient.message.reply(guild.channelId, guild.messageId, replyContent);

    return true;
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

    liveClient.message.reply(guild.channelId, guild.messageId, buildResponse);
    return true;
  }
}
