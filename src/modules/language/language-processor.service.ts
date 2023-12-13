import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { EsService } from '../../common/services/es.service';
import { DataStructure } from '../../common/services/data-structure.service';

@injectable()
export class LanguageProcessorService {
  constructor(
    @inject(TYPES.EsService) private readonly esService: EsService,
    @inject(TYPES.DataStructureService)
    private readonly dataStructure: DataStructure,
  ) {}
  /**Match Phrase with Elastic Search */
  async textMatchAndWhiteList(
    index: string,
    id: string,
    text: string,
    whitelistLibId?: string,
  ) {
    const getMatch = await this.esService.searchText(
      index,
      this.getSearchTextQuery(id, text),
    );
    const formatMatchData = getMatch.map((e) => {
      return e.data.toLowerCase();
    });

    const res = await this.dataStructure.matchPhrase(
      text.toLowerCase(),
      formatMatchData,
    );

    return res;
  }

  private getSearchTextQuery(id: string, text: string) {
    return {
      query: {
        bool: {
          must: [
            {
              match: {
                refId: id,
              },
            },
            {
              query_string: {
                query: `*${text}*`,
                fields: ['data'],
              },
            },
          ],
        },
      },
    };
  }
}
