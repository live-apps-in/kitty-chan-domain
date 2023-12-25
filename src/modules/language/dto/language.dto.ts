import { LanguageFilterDto } from './language-filter.dto';
import { StrongLanguage } from './strong-language.dto';

export interface LanguageDto {
  strongLanguage: StrongLanguage;
  languageFilter: LanguageFilterDto;
}
