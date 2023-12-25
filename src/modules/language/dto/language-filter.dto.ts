import { FeatureDefault } from '../../../common/dto/features-default.dto';
import { LanguageAction } from '../enum/language-filter.enum';

export class LanguageFilterDto extends FeatureDefault {
  public languageFilterConfig: LanguageFilterConfigDto[];
}

export class LanguageFilterConfigDto {
  public isActive: boolean;
  public languageLibId: string;
  public actionConfig: LanguageFilterTriggerAction;
}

class LanguageFilterTriggerAction {
  public action: LanguageAction;
  public emoji: string;
  public plainMessage: string;
}
