import { AutoSailConfigDto } from './auto-sail-config.dto';

export class AutoSailCreateDto {
  name: string;
  description: string;
  guildId: string;
  userId: string;
  config: AutoSailConfigDto;
  isActive: boolean;
}
