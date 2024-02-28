import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  ValidateNested,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';
import { FeatureDefault } from 'src/common/dto/features-default.dto';
import { StrongLanguageCodes } from 'src/modules/language/enum/strong_language.enum';

export class StrongLanguageConfig {
  @IsNotEmpty()
  @IsEnum(StrongLanguageCodes)
  language: StrongLanguageCodes;

  @IsNotEmpty()
  @IsMongoId()
  whitelistLib: Types.ObjectId;
}

export class StrongLanguageDto extends FeatureDefault {
  @IsArray()
  @Type(() => StrongLanguageConfig)
  @ValidateNested()
  languageConfig: StrongLanguageConfig[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  actionConfig: ActionConfigDto[];
}
