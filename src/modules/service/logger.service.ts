import { inject, injectable } from 'inversify';
import { IMessageUpdate } from '../interface/shared.interface';
import Guild from '../../model/guild.model';
import DiscordTemplateModel from '../../model/discord_templates.model';
import {
  DiscordTemplateType,
  DiscordTemplateTarget,
} from '../enum/discord_template.enum';
import { liveClient } from '../app';
import { TYPES } from '../../core/inversify.types';
import { DiscordTemplateService } from './shared/discord_template.service';

@injectable()
export class LoggerService {
  constructor(
    @inject(TYPES.DiscordTemplateService)
    private readonly templateService: DiscordTemplateService,
  ) {}

  async messageUpdate(message: IMessageUpdate) {
    const { features } = await Guild.findOne(
      { guildId: message.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.messageUpdate?.channelId) {
      return;
    }

    const template = await this.getDefaultTemplate();
    if (!template) return;

    const buildTemplate = {
      ...template.embed,
      author: {
        name: message.username,
        icon_url: `https://cdn.discordapp.com/avatars/${message.userId}/${message.avatar}.png`,
      },
    };

    const embeds: any = await this.templateService.fillEmbedTemplate(
      message,
      buildTemplate,
    );

    await liveClient.message.sendEmbed(
      features.logger.options.messageUpdate.channelId,
      [embeds],
    );
  }

  private getDefaultTemplate() {
    return DiscordTemplateModel.findOne({
      type: DiscordTemplateType.embed,
      target: DiscordTemplateTarget.messageUpdate,
    });
  }
}
