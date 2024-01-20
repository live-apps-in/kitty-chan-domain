import { injectable } from 'inversify';
import { discordClient } from '../../modules/app';
import { DiscordActionTypes } from '../enum/discord-action.enum';
import { ActionConfigDto } from '../dto/action-config.dto';

@injectable()
export class DiscordActionService {
  async actionFactory(action: DiscordActionTypes, config: any) {
    switch (action) {
      case DiscordActionTypes.MESSAGE_CREATE: {
        await this.createMessage(config);

        return;
      }

      case DiscordActionTypes.MESSAGE_REACT: {
        await this.react(config);

        return;
      }

      case DiscordActionTypes.MESSAGE_REPLY: {
        await this.reply(config);

        return;
      }

      case DiscordActionTypes.MESSAGE_DELETE: {
        await this.deleteMessage(config);

        return;
      }

      default:
        break;
    }
  }

  async process(actionConfigs: ActionConfigDto[]) {
    for (const actionConfig of actionConfigs) {
      await this.actionFactory(actionConfig.action, actionConfig.messageConfig);
    }
  }

  private async createMessage(config: any) {
    await discordClient.message.send(config.channelId, config.plainMessage);
  }

  private async react(config: any) {
    await discordClient.message.react(
      config.channelId,
      config.messageId,
      config.emoji,
    );
  }

  private async reply(config: any) {
    await discordClient.message.reply(
      config.channelId,
      config.messageId,
      config.plainMessage,
    );
  }

  private async deleteMessage(config: any) {
    await discordClient.message.delete(config.channelId, config.messageId);
  }
}
