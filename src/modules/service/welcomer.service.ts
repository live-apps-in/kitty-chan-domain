import { injectable } from 'inversify';
import { IGuildMember } from '../interface/shared.interface';
import DiscordTemplateModel from '../../model/discord_templates.model';
import { liveClient } from '../app';
import Guild from '../../model/guild.model';

export enum DiscordTemplateTarget {
  WELCOME_MESSAGE = 'welcomeMessage',
}

@injectable()
export class WelcomerService {
  async handle(guild: IGuildMember) {
    const guildConfig = await Guild.findOne({ guildId: guild.guildId });
    if (!guildConfig?.welcomer.channelId) return;

    const template = await this.getDefaultTemplate();
    if (!template) return;

    await liveClient.message.send(
      guildConfig.welcomer.channelId,
      await this.fillTemplatePlaceHolder(template.content, guild),
    );
  }

  private async getDefaultTemplate() {
    return DiscordTemplateModel.findOne({
      type: 'plain',
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
