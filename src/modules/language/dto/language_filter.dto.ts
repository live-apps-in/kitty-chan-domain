import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';
import { FeatureDefault } from 'src/common/dto/features-default.dto';

class LanguageFilterConfigDto {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public languageLibId: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  public actionConfig: ActionConfigDto[];
}

export class LanguageFilterDto extends FeatureDefault {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => LanguageFilterConfigDto)
  @ValidateNested()
  public languageFilterConfig: LanguageFilterConfigDto[];
}
