import { CronModuleTypes } from 'src/modules/cron/enum/cron-modules.enum';

export interface ICronCreate {
  id?: string;
  module?: CronModuleTypes;
  expression?: string;
}
