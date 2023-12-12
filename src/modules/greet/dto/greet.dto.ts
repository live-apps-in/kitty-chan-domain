import { FeatDefaultWithTemplates } from '../../../common/dto/features-default.dto';

export class GreetDto {
  public isActive: boolean;

  public welcome: FeatDefaultWithTemplates;

  public farewell: FeatDefaultWithTemplates;
}
