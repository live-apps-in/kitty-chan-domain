import { ActionConfigDto } from '../../../common/dto/action-config.dto';
import { AutoSailTriggerEvents } from '../enum/auto-sail-trigger-events.enum';
import { AutoSailConstraintsDto } from './auto-sail-constraints.dto';

export class AutoSailConfigDto {
  triggerEvent: AutoSailTriggerEvents;
  constraints: AutoSailConstraintsDto[];
  actionConfig: ActionConfigDto[];
}
