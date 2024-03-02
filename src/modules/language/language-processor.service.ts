import { Inject, Injectable } from '@nestjs/common';
import { EsService } from '../../common/services/connectivity/es.service';
import { DataStructure } from 'src/common/services/data-structure.service';

@Injectable()
export class LanguageProcessorService {
  constructor(
    @Inject(EsService) private readonly esService: EsService,
    @Inject(DataStructure)
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
