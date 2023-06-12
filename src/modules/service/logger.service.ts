import { inject, injectable } from 'inversify';
import { IMessageDelete, IMessageUpdate } from '../interface/shared.interface';
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

  /**Guild Message Update Logger */
  async messageUpdate(message: IMessageUpdate) {
    const { features } = await Guild.findOne(
      { guildId: message.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.messageUpdate?.channelId) {
      return;
    }

    const template = await this.getDefaultTemplate(
      DiscordTemplateTarget.messageUpdate,
      DiscordTemplateType.embed,
    );
    if (!template) return;

    const buildTemplate = {
      ...template.embed,
    };

    //Convert milliseconds to seconds
    const dateObject = new Date(Math.floor(message.editedAt / 1000) * 1000);
    const unixTimestampInSec = dateObject.getTime() / 1000;
    message.editedAt = unixTimestampInSec;

    const guild = await liveClient.guild.fetch(message.guildId);

    const mutatedMessage = {
      ...message,
      guildName: guild.name,
    };

    const embeds: any = await this.templateService.fillEmbedTemplate(
      mutatedMessage,
      buildTemplate,
    );

    await liveClient.message.sendEmbed(
      features.logger.options.messageUpdate.channelId,
      [embeds],
    );
  }

  /**Guild Message Delete Logger */
  async messageDelete(message: IMessageDelete) {
    const { features } = await Guild.findOne(
      { guildId: message.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.messageDelete?.channelId) {
      return;
    }

    const template = await this.getDefaultTemplate(
      DiscordTemplateTarget.messageDelete,
      DiscordTemplateType.embed,
    );
    if (!template) return;

    const buildTemplate = {
      ...template.embed,
    };

    const guild = await liveClient.guild.fetch(message.guildId);

    const mutatedMessage = {
      ...message,
      guildName: guild.name,
    };

    const embeds: any = await this.templateService.fillEmbedTemplate(
      mutatedMessage,
      buildTemplate,
    );

    await liveClient.message.sendEmbed(
      features.logger.options.messageUpdate.channelId,
      [embeds],
    );
  }

  private getDefaultTemplate(target: string, type: string) {
    return DiscordTemplateModel.findOne({
      type,
      target,
    });
  }
}
