import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

/**Fundamental fields for Features */
export class FeatureDefault {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;
}

/**Features which has access to Message templates */
export class FeatDefaultWithTemplates extends FeatureDefault {
  @IsNotEmpty()
  @ValidateIf((o) => o.channelId !== null)
  @IsString()
  public channelId: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.templateId !== null)
  @IsString()
  public templateId: string;
}
