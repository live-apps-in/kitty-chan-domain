import { ActionConfigDto } from '../../../common/dto/action-config.dto';
import { FeatureDefault } from '../../../common/dto/features-default.dto';
import { StrongLanguageCodes } from '../enum/strong-language.enum';

export interface StrongLanguageConfig {
  language: StrongLanguageCodes;
  whitelistLib: string;
}
export interface StrongLanguage extends FeatureDefault {
  languageConfig: StrongLanguageConfig[];
  actionConfig: ActionConfigDto[];
}
