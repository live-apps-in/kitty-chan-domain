import { inject } from 'inversify';
import { EsService } from '../common/services/es.service';
import LanguageLibs from '../modules/language/model/language-libs.model';
import { esClient } from '../database/elastic-search';
import { v4 } from 'uuid';

/* Data Libs */
export const strong_language_en = [];
export const hinglish_words = [];
export class OnInit {
  constructor(@inject(EsService) private readonly esService: EsService) {}
  async bootstrap() {
    if (process.env.LOAD_SYSTEM_DATA === 'true') {
      await Promise.all([this.loadSystemLanguageLibs()]);
      console.info('System data imported!');
    }
  }

  /**
   * Load Language Library to Elastic Search
   */
  private async loadSystemLanguageLibs() {
    //Delete all existing data
    await esClient.deleteByQuery({
      index: 'language-lib',
      body: {
        query: {
          terms: {
            id: ['strong-language-en', 'language-filter-hindi'],
          },
        },
      },
    });
    const languageLibs = await LanguageLibs.find({ system: true }).lean();

    languageLibs.map(async (e) => {
      for (const data of e.data) {
        const languageData = {
          name: e.name,
          system: e.system,
          guildId: e.guildId,
          type: e.type,
          id: e.name,
          refId: e._id,
          data,
        };

        await this.esService.createOrUpdateIndex('language-lib', v4(), {
          ...languageData,
        });
      }
    });
  }
}
