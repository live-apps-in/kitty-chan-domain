import { FeatDefaultWithTemplates } from '../../../common/dto/FeaturesDefault.dto';

export class GreetDto {
  public isActive: boolean;

  public welcome: FeatDefaultWithTemplates;

  public farewell: FeatDefaultWithTemplates;
}
