import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AutoSailConfigDto } from 'src/modules/auto-sail/dto/auto-sail-config.dto';
import { AutoSailTriggerType } from 'src/modules/auto-sail/enum/auto-sail-trigger-type.enum';

export class AutoSailCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(AutoSailTriggerType)
  @IsNotEmpty()
  type: AutoSailTriggerType;

  guildId: string;
  userId: string;

  @Type(() => AutoSailConfigDto)
  @ValidateNested()
  @IsNotEmpty()
  config: AutoSailConfigDto;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
