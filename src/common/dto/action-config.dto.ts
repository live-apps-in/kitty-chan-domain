import { DiscordActions } from '../enum/discord-action.enum';

interface ActionMessageConfig {
  channelId?: string;
  messageType?: string;
  plainMessage?: string;
  embed?: any;
  emoji?: string;
  message?: string;
}

export class ActionConfigDto {
  action: DiscordActions;
  messageConfig: ActionMessageConfig;
}
