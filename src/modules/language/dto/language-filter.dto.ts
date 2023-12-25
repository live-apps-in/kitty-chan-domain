import { FeatureDefault } from '../../../common/dto/features-default.dto';
import { LanguageAction } from '../enum/language-filter.enum';

export interface LanguageFilterDto extends FeatureDefault {
  languageFilterConfig: LanguageFilterConfigDto[];
}

export interface LanguageFilterConfigDto {
  isActive: boolean;
  languageLibId: string;
  actionConfig: LanguageFilterTriggerAction;
}

interface LanguageFilterTriggerAction {
  action: LanguageAction;
  emoji: string;
  plainMessage: string;
}
