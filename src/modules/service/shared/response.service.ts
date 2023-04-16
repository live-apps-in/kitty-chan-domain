import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { DiscordEmbeds } from '../../../types/discord.types';
import { REPLY } from '../../enum/reply';
import { IGuild } from '../../interface/shared.interface';
import { SharedService } from '../../shared/shared.service';

interface RespondConfig {
  type: string;
  guild: IGuild;
  body: any;
}

@injectable()
export class ResponseService {
  constructor(
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
  ) {}

  async respond(payload: RespondConfig): Promise<void> {
    const config = await new ResponseFactory().getResponseConfig(
      payload.type,
      payload.guild,
      payload.body,
    );
    return this.sharedService.axiosInstance({
      method: config.method,
      route: config.route,
      body: payload.body,
    });
  }

  /**
   * Messages
   */
  async deleteMessage(guild: IGuild) {
    return this.respond({
      type: REPLY.deleteMessage,
      guild,
      body: {},
    });
  }

  /**
   * Message Embeds
   */
  async embedMessage(embeds: DiscordEmbeds[], guild: IGuild) {
    return this.respond({
      type: REPLY.sendEmbed,
      guild,
      body: {
        embeds,
      },
    });
  }

  async editEmbedMessage(embeds: DiscordEmbeds[], guild: IGuild) {
    return this.respond({
      type: REPLY.editEmbed,
      guild,
      body: {
        embeds,
      },
    });
  }
  async replyMessage(content: string, guild: IGuild) {
    await this.respond({
      type: REPLY.replyMessage,
      guild,
      body: {
        content,
        message_reference: {
          message_id: guild.messageId,
        },
      },
    });

    return;
  }
}

class ResponseFactory {
  async getResponseConfig(type: string, guild: IGuild, body: any) {
    const { channelId, messageId } = guild;
    const config: any = {};

    switch (type) {
      case REPLY.sendMessage:
        config.route = `/channels/${channelId}/messages`;
        config.method = 'post';
        break;
      case REPLY.replyMessage:
        config.route = `/channels/${channelId}/messages`;
        config.method = 'post';
        break;
      case REPLY.deleteMessage:
        config.route = `/channels/${channelId}/messages/${messageId}`;
        config.method = 'delete';
        break;
      case REPLY.sendEmbed:
        config.route = `/channels/${channelId}/messages`;
        config.method = 'post';
        break;
      case REPLY.editEmbed:
        config.route = `/channels/${channelId}/messages/${messageId}`;
        config.method = 'patch';
        break;
      case REPLY.addReaction:
        config.route = `/channels/${channelId}/messages/${messageId}/reactions/${body.emoji}/@me`;
        config.method = 'put';
        break;

      default:
        break;
    }
    return config;
  }
}
