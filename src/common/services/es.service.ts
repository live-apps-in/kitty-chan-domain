import { injectable } from 'inversify';
import { esClient } from '../../database/elastic-search';

@injectable()
export class EsService {
  async createOrUpdateIndex(index: string, id: string, body: any) {
    await esClient.index({ index, id, body });
  }
  async countById(id: string) {
    const res = await esClient.count({
      body: {
        query: {
          match: { _id: id },
        },
      },
    });

    return res.body.count;
  }
}
