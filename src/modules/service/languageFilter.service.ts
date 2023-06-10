import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { IGuild } from '../interface/shared.interface';
import { StatsLoggerService } from './stats_logger.service';
import { VIOLATIONS } from '../enum/violations';
import { bad_words, hinglish_words } from '../../jobs/onInit';
import { liveClient } from '../app';
require('dotenv/config');

@injectable()
export class LanguageFilter {
  constructor(
    @inject(TYPES.StatsLoggerService)
    private readonly StatsLoggerService: StatsLoggerService,
  ) {}

  ///Non-English Detection
  async non_english_detection(guild: IGuild): Promise<boolean> {
    let { messageContent } = guild;

    messageContent = messageContent.toLowerCase().trim();
    const messageChunk = messageContent.split(' ');
    let isNonEnglish = false;

    messageChunk.map((e) => {
      if (hinglish_words.includes(e)) isNonEnglish = true;
    });

    if (isNonEnglish) {
      await liveClient.message.react(
        guild.channelId,
        guild.messageId,
        '%E2%9A%A0%EF%B8%8F',
      );

      ///Log Violation
      await this.StatsLoggerService.violation_logger(
        guild,
        VIOLATIONS.non_english,
      );
    }

    return isNonEnglish;
  }

  ///Strong Language Detection
  async strong_language_detection(guild: IGuild): Promise<boolean> {
    let { messageContent } = guild;
    messageContent = messageContent.toLowerCase().trim();
    const messageChunk: string[] = messageContent.split(' ');
    let isStrongLanguage = false;

    messageChunk.map((e) => {
      if (bad_words.includes(e)) isStrongLanguage = true;
    });

    if (isStrongLanguage) {
      await liveClient.message.react(
        guild.channelId,
        guild.messageId,
        '%E2%9A%A0%EF%B8%8F',
      );

      ///Log Violation
      await this.StatsLoggerService.violation_logger(
        guild,
        VIOLATIONS.strong_language,
      );
    }

    return isStrongLanguage;
  }
}
