import { inject } from 'inversify';
import { EsService } from '../common/services/es.service';
import LanguageLibs from '../modules/language/model/language-libs.model';
import { esClient } from '../database/elastic-search';
import { v4 } from 'uuid';
import { LanguageLibRefIds } from '../common/store/language-lib.store';

/* Data Libs */
export const strong_language_en = [];
export const hinglish_words = [];
export class OnInit {
  constructor(@inject(EsService) private readonly esService: EsService) {}
  async bootstrap() {
    await this.syncLanguageLibRefId();

    if (process.env.LOAD_LANGUAGE_LIBS === 'true') {
      await this.loadSystemLanguageLibs();

      console.info('System data imported!');
    }
  }

  /**Create or Update Elastic Search indices */
  private async createOrUpdateElasticIndex() {
    const indexName = 'language-lib';
    const indexExists = await esClient.indices.exists({ index: indexName });

    if (indexExists.body) {
      console.log(`Index ${indexName} already exists. Skipping creation.`);
      return;
    }

    await esClient.indices.create({
      index: indexName,
      body: {
        settings: {
          analysis: {
            tokenizer: 'whitespace',
            filter: ['lowercase'],
          },
        },
        mappings: {
          properties: {
            data: {
              type: 'keyword', // Change type to keyword for exact match
              ignore_above: 256, // Adjust if necessary
            },
          },
        },
      },
    });
  }
  /**
   * Load Language Library to Elastic Search
   */
  private async loadSystemLanguageLibs() {
    //Delete all existing data
    //Workaround - Multiple delete causing conflict in seqNo
    const languageIndexName = 'language-lib';
    const languageLibIndex = await esClient.indices.exists({
      index: languageIndexName,
    });
    if (languageLibIndex.body) {
      console.log(`Deleting index - ${languageIndexName}`);
      await esClient.deleteByQuery({
        index: languageIndexName,
        body: {
          query: {
            match: {
              id: 'strong-language-en',
            },
          },
        },
      });
    }

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

  private async syncLanguageLibRefId() {
    const languageLibs = await LanguageLibs.find({ system: true }).lean();

    languageLibs.map((e) => {
      //Update refId to local store
      LanguageLibRefIds[e.name] = e._id.toString();
    });
  }
}
