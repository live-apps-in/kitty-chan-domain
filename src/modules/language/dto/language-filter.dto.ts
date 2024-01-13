import { ActionConfigDto } from '../../../common/dto/action-config.dto';
import { FeatureDefault } from '../../../common/dto/features-default.dto';

export interface LanguageFilterDto extends FeatureDefault {
  languageFilterConfig: LanguageFilterConfigDto[];
}

export interface LanguageFilterConfigDto {
  isActive: boolean;
  languageLibId: string;
  actionConfig: ActionConfigDto[];
}
