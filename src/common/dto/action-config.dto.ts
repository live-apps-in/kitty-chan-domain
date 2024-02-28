import { DiscordActionTypes } from 'src/common/enum/discord-action.enum';

interface ActionMessageConfig {
  channelId?: string;
  messageType?: string;
  plainMessage?: string;
  embed?: any;
  emoji?: string;
  message?: string;
}

export class ActionConfigDto {
  action: DiscordActionTypes;
  messageConfig: ActionMessageConfig;
}
