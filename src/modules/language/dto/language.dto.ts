import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StrongLanguageDto } from 'src/modules/language/dto/strong_language.dto';
import { LanguageFilterDto } from 'src/modules/language/dto/language_filter.dto';

export class LanguageDto {
  @IsNotEmpty()
  @Type(() => StrongLanguageDto)
  @ValidateNested()
  public strongLanguage: StrongLanguageDto;

  @IsNotEmpty()
  @Type(() => LanguageFilterDto)
  @ValidateNested()
  public languageFilter: LanguageFilterDto;
}
