import { inject } from 'inversify';
import { EsService } from '../common/services/es.service';
import LanguageLibs from '../modules/language/model/language_libs.model';

/* Data Libs */
export let strong_language_en = [];
export let hinglish_words = [];
export class OnInit {
  constructor(@inject(EsService) private readonly esService: EsService) {}
  async bootstrap() {
    await Promise.all([this.loadSystemLanguageLibs()]);
  }

  /**
   * Load Language Library to Elastic Search
   */
  private async loadSystemLanguageLibs() {
    const languageLibs = await LanguageLibs.find({ system: true }).lean();

    languageLibs.map(async (e) => {
      const { _id, ...payload } = e;
      await this.esService.createOrUpdateIndex(
        'language-lib',
        `language-lib-${e.name}`,
        { ...payload },
      );
    });
  }
}
