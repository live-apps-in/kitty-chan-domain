import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify.types';
import { EsService } from '../../common/services/es.service';

@injectable()
export class LanguageProcessorService {
  constructor(@inject(TYPES.EsService) private readonly esService: EsService) {}
  /**Match Phrase with Elastic Search */
  async textMatchAndWhiteList(index: string, id: string, text: string) {
    const getMatch = await this.esService.searchText(index, {
      query: {
        bool: {
          must: [
            {
              match: {
                id,
              },
            },
            {
              match: {
                data: {
                  query: text,
                  operator: 'and',
                },
              },
            },
          ],
        },
      },
    });

    return getMatch;
  }
}
