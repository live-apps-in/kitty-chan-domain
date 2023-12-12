import { FeatureDefault } from '../../../common/dto/features-default.dto';
import { LanguageAction } from '../enum/language-filter.enum';
import { StrongLanguageCodes } from '../enum/strong-language.enum';

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
