import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify.types';
import { ACTIONS } from '../../enum/action';
import { IGuild } from '../../interface/shared.interface';
import { SharedService } from '../shared/shared.service';

interface RespondConfig {
  type: string;
  guild: IGuild;
  body: any;
}

@injectable()
export class ActionService {
  constructor(
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
  ) {}

  async call(payload: RespondConfig): Promise<any> {
    const config = await new ActionFactory().getActionConfig(
      payload.type,
      payload.guild,
      payload.body,
    );
    // return this.sharedService.axiosInstance({
    //   method: config.method,
    //   route: config.route,
    //   body: payload.body,
    // });
  }
}

class ActionFactory {
  async getActionConfig(type: string, guild: IGuild, body: any) {
    const { guildId, userId } = guild;
    const config: any = {};

    switch (type) {
      ///Guild User
      case ACTIONS.searchGuildUser:
        config.route = `/guilds/${guildId}/members/search?query=${body.username}&limit=1000`;
        config.method = 'get';
        break;

      ///Roles
      case ACTIONS.setRole:
        config.route = `/guilds/${guildId}/members/${userId}/roles/${body.roleId}`;
        config.method = 'put';
        break;
      case ACTIONS.deleteRole:
        config.route = `/guilds/${guildId}/members/${userId}/roles/${body.roleId}`;
        config.method = 'delete';
        break;

      ///Channel
      case ACTIONS.editChannel:
        config.route = `/channels/${guild.channelId}`;
        config.method = 'patch';
        break;

      ///Thread
      case ACTIONS.createThreadFromMessage:
        config.route = `/channels/${guild.channelId}/messages/${guild.messageId}/threads`;
        config.method = 'post';
        break;

      default:
        break;
    }
    return config;
  }
}
