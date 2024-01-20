import { injectable } from 'inversify';
import { IGuildMember } from '../../common/interface/shared.interface';
import DiscordTemplateModel from '../template/model/discord-templates.model';
import { discordClient } from '../app';
import Guild from '../guild/model/guild.model';
import {
  DiscordTemplateType,
  DiscordTemplateTarget,
} from '../../common/enum/discord-template.enum';

@injectable()
export class WelcomerService {
  async handle(guild: IGuildMember) {
    const guildConfig = (await Guild.findOne({
      guildId: guild.guildId,
    })) as any;
    if (!guildConfig?.welcomer?.channelId) return;

    const template = await this.getDefaultTemplate();
    if (!template) return;

    await discordClient.message.send(
      guildConfig.welcomer.channelId,
      await this.fillTemplatePlaceHolder(template.content, guild),
    );
  }

  private async getDefaultTemplate() {
    return DiscordTemplateModel.findOne({
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
