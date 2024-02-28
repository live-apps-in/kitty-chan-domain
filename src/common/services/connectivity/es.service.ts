import { injectable } from 'inversify';
import { Inject } from '@nestjs/common';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { Client as EsClient } from '@elastic/elasticsearch';

@injectable()
export class EsService {
  constructor(
    @Inject(PROVIDER_TYPES.EsClient) private readonly esClient: EsClient,
  ) {}
  async createOrUpdateIndex(index: string, id: string, body: any) {
    await this.esClient.index({ index, id, body });
  }

  async searchText(index: string, query: any) {
    const res = await this.esClient.search({ index, body: query });

    return res.body.hits.hits.map((hit) => ({
      id: hit._id,
      data: hit._source.data,
    }));
  }

  async countById(id: string) {
    const res = await this.esClient.count({
      body: {
        query: {
          match: { _id: id },
        },
      },
    });

    return res.body.count;
  }

  async ping() {
    return this.esClient.ping();
  }

  async indexExists(index: string) {
    return this.esClient.indices.exists({ index });
  }

  async createIndex(index: string) {
    await this.esClient.indices.create({
      index,
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
              type: 'keyword',
              ignore_above: 256,
            },
          },
        },
      },
    });
  }

  async deleteByQuery(index: string, id: string) {
    await this.esClient.deleteByQuery({
      index,
      body: {
        query: {
          match: {
            id,
          },
        },
      },
    });
  }
}
