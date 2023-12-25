import { AutoSailConfigDto } from './auto-sail-config.dto';

export interface AutoSailCreateDto {
  name: string;
  description: string;
  guildId: string;
  userId: string;
  config: AutoSailConfigDto;
  isActive: boolean;
}
