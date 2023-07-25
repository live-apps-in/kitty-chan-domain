import { FeatureDefault } from '../../../common/dto/FeaturesDefault.dto';
import { LanguageAction } from '../enum/language_filter.enum';

export class LanguageFilterDto extends FeatureDefault {
  public languageFilterConfig: LanguageFilterConfigDto[];
}

export class LanguageFilterConfigDto {
  public isActive: boolean;

  public dataLibId: string;

  public actionConfig: LanguageFilterTriggerAction;
}

class LanguageFilterTriggerAction {
  public action: LanguageAction;

  public reactEmoji: string;

  public replyMessage: string;
}
