import { Guild } from '@live-apps/discord/lib/modules/guild/guild';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class GuildRepository {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
  ) {}

  async create(payload: any): Promise<void> {
    await this.guildModel.insertMany(payload);
  }

  async getByGuildId(guildId: string) {
    const guild = await this.guildModel.findOne({ guildId });
    return guild;
  }

  async get() {
    const guild = await this.guildModel.findOne({});
    return guild;
  }

  async update(_id: Types.ObjectId, payload: any) {
    await this.guildModel.updateOne(
      { _id },
      {
        $set: { ...payload },
      },
    );
  }

  async update_by_guildId(guildId: string, payload: any) {
    await this.guildModel.updateOne(
      { guildId },
      {
        $set: { ...payload },
      },
    );
  }
}
