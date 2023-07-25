import { injectable } from 'inversify';
import { IGuild } from '../interface/shared.interface';
import { liveClient } from '../../modules/app';
import { DiscordActions } from '../enum/discord_action.enum';

@injectable()
export class DiscordActionService {
  async actionFactory(action: DiscordActions, guild: IGuild, config: any) {
    switch (action) {
      case DiscordActions.REACT:
        await this.react(guild, config);
        break;

      case DiscordActions.REPLY:
        await this.reply(guild, config);
        break;

      case DiscordActions.DELETE:
        await this.deleteMessage(guild);
        break;

      default:
        break;
    }
  }

  private async react(guild: IGuild, config: any) {
    await liveClient.message.react(
      guild.channelId,
      guild.messageId,
      config.reactEmoji,
    );
  }

  private async reply(guild: IGuild, config: any) {
    await liveClient.message.reply(
      guild.channelId,
      guild.messageId,
      config.replyMessage,
    );
  }

  private async deleteMessage(guild: IGuild) {
    await liveClient.message.delete(guild.channelId, guild.messageId);
  }
}
