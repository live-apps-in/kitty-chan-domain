import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';
import { AutoSailConstraintsDto } from 'src/modules/auto-sail/dto/auto-sail-constraints.dto';
import { AutoSailTriggerEvents } from 'src/modules/auto-sail/enum/auto-sail-trigger-events.enum';
import { CronConfigDto } from 'src/modules/cron/dto/cron-config.dto';

export class AutoSailConfigDto {
  @IsEnum(AutoSailTriggerEvents)
  @IsOptional()
  triggerEvent?: AutoSailTriggerEvents;

  @IsOptional()
  @Type(() => CronConfigDto)
  @ValidateNested()
  cronConfig?: CronConfigDto;

  @IsArray()
  @IsOptional()
  @Type(() => AutoSailConstraintsDto)
  @ValidateNested()
  constraints?: AutoSailConstraintsDto[];

  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  actionConfig: ActionConfigDto[];
}
