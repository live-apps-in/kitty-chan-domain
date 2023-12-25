import { FeatureDefault } from '../../../common/dto/features-default.dto';
import { LanguageAction } from '../enum/language-filter.enum';
import { StrongLanguageCodes } from '../enum/strong-language.enum';

interface StrongLanguageTriggerAction {
  action: LanguageAction;
  emoji: string;
  plainMessage: string;
}

export interface StrongLanguageConfig {
  language: StrongLanguageCodes;
  whitelistLib: string;
}
export interface StrongLanguage extends FeatureDefault {
  languageConfig: StrongLanguageConfig[];
  actionConfig: StrongLanguageTriggerAction;
}
