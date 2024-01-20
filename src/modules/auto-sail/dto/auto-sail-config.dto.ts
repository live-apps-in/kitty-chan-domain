import { ActionConfigDto } from '../../../common/dto/action-config.dto';
import { CronConfigDto } from '../../cron/dto/cron-config.dto';
import { AutoSailTriggerEvents } from '../enum/auto-sail-trigger-events.enum';
import { AutoSailConstraintsDto } from './auto-sail-constraints.dto';

export interface AutoSailConfigDto {
  triggerEvent?: AutoSailTriggerEvents;
  cronConfig?: CronConfigDto;
  constraints?: AutoSailConstraintsDto[];
  actionConfig: ActionConfigDto[];
}
