import { injectable } from 'inversify';
import Features from '../model/features.model';
import { FeaturesEnum } from '../enum/features.enum';

@injectable()
export class FeaturesRepo {
  async findByGuildId(guildId: string) {
    return Features.findOne({ guildId });
  }

  async findSingleFeature(guildId: string, feature: string) {
    const singleFeature = await Features.findOne({ guildId }, { [feature]: 1 });

    return singleFeature[feature];
  }

  async updateSingleFeature(
    guildId: string,
    feature: FeaturesEnum,
    payload: any,
  ) {
    await Features.updateOne(
      { guildId },
      {
        $set: { [feature]: payload },
      },
    );
  }
}
