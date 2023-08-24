import { FeatureDefault } from '../../../common/dto/FeaturesDefault.dto';
import { LanguageAction } from '../enum/language_filter.enum';
import { StrongLanguageCodes } from '../enum/strong_language.enum';

class StrongLanguageTriggerAction {
  public action: LanguageAction;

  public reactEmoji: string;

  public replyMessage: string;
}

export class StrongLanguageConfig {
  language: StrongLanguageCodes;

  whitelistLib: string;
}
export class StrongLanguage extends FeatureDefault {
  languageConfig: StrongLanguageConfig[];

  public actionConfig: StrongLanguageTriggerAction;
}
