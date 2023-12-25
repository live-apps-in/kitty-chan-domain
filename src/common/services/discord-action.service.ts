import { injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';
import { liveClient } from '../../modules/app';
import { DiscordActions } from '../enum/discord-action.enum';

@injectable()
export class DiscordActionService {
  async actionFactory(action: DiscordActions, guild: IGuild, config: any) {
    switch (action) {
      case DiscordActions.MESSAGE_CREATE: {
        await this.createMessage(guild, config);

        break;
      }

      case DiscordActions.MESSAGE_REACT:
        await this.react(guild, config);
        break;

      case DiscordActions.MESSAGE_REPLY:
        await this.reply(guild, config);
        break;

      case DiscordActions.MESSAGE_DELETE:
        await this.deleteMessage(guild);
        break;

      default:
        break;
    }
  }

  private async createMessage(guild: IGuild, config: any) {
    await liveClient.message.send(guild.channelId, config.plainMessage);
  }

  private async react(guild: IGuild, config: any) {
    await liveClient.message.react(
      guild.channelId,
      guild.messageId,
      config.emoji,
    );
  }

  private async reply(guild: IGuild, config: any) {
    await liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      config.plainMessage,
    );
  }

  private async deleteMessage(guild: IGuild) {
    await liveClient.message.delete(guild.channelId, guild.messageId);
  }
}
