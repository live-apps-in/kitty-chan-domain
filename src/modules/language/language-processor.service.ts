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
    libId: string,
    text: string,
    whitelistLibId?: string,
  ) {
    const matchResults = await this.esService.searchText(
      index,
      this.getSearchTextQuery(libId, text),
    );
    const formatMatchData = matchResults.map((e) => {
      return e.data.toLowerCase();
    });

    const filterExactMatch = this.dataStructure.matchPhrase(
      text.toLowerCase(),
      formatMatchData,
    );

    if (filterExactMatch.detected && whitelistLibId) {
      const matchedText = filterExactMatch.match.join(' ');
      const whitelistSearchResults = await this.esService.searchText(
        index,
        this.getSearchTextQuery(whitelistLibId, matchedText),
      );
      const formatWhitelistMatchData = whitelistSearchResults.map((e) => {
        return e.data.toLowerCase();
      });

      const whitelistMatch = this.dataStructure.matchPhrase(
        matchedText.toLowerCase(),
        formatWhitelistMatchData,
      );

      filterExactMatch.match = filterExactMatch.match.filter(
        (item) => !whitelistMatch.match.includes(item),
      );
    }

    return {
      detected: filterExactMatch.match.length ? true : false,
      match: filterExactMatch,
    };
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
