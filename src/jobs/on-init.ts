import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageLibRefIds } from 'src/common/constants/es.store';
import { EsService } from 'src/common/services/connectivity/es.service';
import { LanguageLibs } from 'src/modules/language/models/language_libs.model';
import { v4 } from 'uuid';

/* Data Libs */
export const strong_language_en = [];
export const hinglish_words = [];
export class OnInit {
  constructor(
    @Inject(EsService) private readonly esService: EsService,
    @InjectModel('language_libs')
    private readonly languageLibModel: Model<LanguageLibs>,
  ) {}
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
    const indexExists = await this.esService.indexExists(indexName);

    if (indexExists.body) {
      console.log(`Index ${indexName} already exists. Skipping creation.`);
      return;
    }

    await this.esService.createIndex(indexName);
  }
  /**
   * Load Language Library to Elastic Search
   */
  private async loadSystemLanguageLibs() {
    //Delete all existing data
    //Workaround - Multiple delete causing conflict in seqNo
    const languageIndexName = 'language-lib';
    const languageLibIndex =
      await this.esService.indexExists(languageIndexName);
    if (languageLibIndex.body) {
      console.log(`Deleting index - ${languageIndexName}`);
      await this.esService.deleteByQuery(
        languageIndexName,
        'strong-language-en',
      );
    }

    const languageLibs = await this.languageLibModel
      .find({ system: true })
      .lean();

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
    const languageLibs = await this.languageLibModel
      .find({ system: true })
      .lean();

    languageLibs.map((e) => {
      //Update refId to local store
      LanguageLibRefIds[e.name] = e._id.toString();
    });
  }
}
