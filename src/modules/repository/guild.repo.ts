import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Guild from '../../model/guild.model';

@injectable()
export class GuildRepo {
  async create(payload: any): Promise<void> {
    await Guild.insertMany(payload);
  }

  async getByGuildId(guildId: string) {
    const features = await Guild.findOne({ guildId });
    return features;
  }

  async get() {
    const features = await Guild.findOne({});
    return features;
  }

  async update(_id: Types.ObjectId, payload: any) {
    await Guild.updateOne(
      { _id },
      {
        $set: { ...payload },
      },
    );
  }

  async update_by_guildId(guildId: string, payload: any) {
    await Guild.updateOne(
      { guildId },
      {
        $set: { ...payload },
      },
    );
  }
}
