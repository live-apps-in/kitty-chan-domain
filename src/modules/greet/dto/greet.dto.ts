import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FeatDefaultWithTemplates } from 'src/common/dto/features-default.dto';

export class GreetDto {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public welcome: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public farewell: FeatDefaultWithTemplates;
}
