import { AutoSailActionEvents } from '../../modules/auto-sail/enum/auto-sail-action.enum';

class ActionMessageCreateConfig {
  channelId: string;
  messageType: string;
  plainMessage: string;
  embed: any;
}

class ActionMessageReactConfig {
  emoji: string;
}

class ActionMessageReplyConfig {
  message: string;
}

type ActionMessageConfig =
  | ActionMessageCreateConfig
  | ActionMessageReactConfig
  | ActionMessageReplyConfig;

export class ActionConfigDto {
  action: AutoSailActionEvents;
  messageConfig: ActionMessageConfig;
}
