import { AutoSailActionEvents } from '../../modules/auto-sail/enum/auto-sail-action.enum';

interface ActionMessageConfig {
  channelId?: string;
  messageType?: string;
  plainMessage?: string;
  embed?: any;
  emoji?: string;
  message?: string;
}

export class ActionConfigDto {
  action: AutoSailActionEvents;
  messageConfig: ActionMessageConfig;
}
