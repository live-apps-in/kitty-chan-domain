import { model, Schema } from 'mongoose';
import { AutoSailConfigDto } from '../dto/auto-sail-config.dto';

export interface IAutoSail {
  name: string;
  description: string;
  guildId: string;
  userId: string;
  config: AutoSailConfigDto;
  isActive: boolean;
}

const AutoSail = new Schema({
  name: String,
  description: String,
  guildId: String,
  userId: String,
  config: Object,
  isActive: Boolean,
});

export default model<IAutoSail>('auto_sail', AutoSail);
