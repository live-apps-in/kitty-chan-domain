import { Client } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import {
  DiscordTemplateType,
  DiscordTemplateTarget,
} from 'src/common/enum/discord-template.enum';
import { IGuildMember } from 'src/common/interface/guild.interface';
import { DiscordTemplate } from 'src/modules/discord-template/models/discord-template.model';
import { Guild } from 'src/modules/guild/models/guild.model';

@Injectable()
export class WelcomerService {
  constructor(
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(DiscordTemplate.name)
    private readonly discordTemplateModel: Model<DiscordTemplate>,
  ) {}
  async handle(guild: IGuildMember) {
    //TODO - Refactor
    const guildConfig = (await this.guildModel.findOne({
      guildId: guild.guildId,
    })) as any;
    if (!guildConfig?.welcomer?.channelId) return;

    const template = await this.getDefaultTemplate();
    if (!template) return;

    await this.discordClient.message.send(
      guildConfig.welcomer.channelId,
      await this.fillTemplatePlaceHolder(template.content, guild),
    );
  }

  private async getDefaultTemplate() {
    return this.discordTemplateModel.findOne({
      type: DiscordTemplateType.plain,
      target: DiscordTemplateTarget.WELCOME_MESSAGE,
    });
  }

  private async fillTemplatePlaceHolder(content: string, guild: IGuildMember) {
    const userIdPlaceholder = '${userId}';
    const guildNamePlaceholder = '${guildName}';

    // Replace userId placeholder if it exists
    if (content.includes(userIdPlaceholder)) {
      const userIdValue = `<@${guild.userId}>`;
      content = content.replace(userIdPlaceholder, userIdValue);
    }

    // Replace guildName placeholder
    content = content.replace(guildNamePlaceholder, guild.guildName);

    return content;
  }
}
