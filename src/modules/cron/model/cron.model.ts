import { model, Schema } from 'mongoose';
import { CronModuleTypes } from '../enum/cron-modules.enum';

export interface ICron {
  module: CronModuleTypes;
  expression: string;
  isActive: boolean;
}

const Cron = new Schema({
  module: String,
  expression: String,
  isActive: Boolean,
});

export default model<ICron>('cron', Cron);
