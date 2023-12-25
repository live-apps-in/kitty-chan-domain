import { FeatDefaultWithTemplates } from '../../../common/dto/features-default.dto';

export interface GreetDto {
  isActive: boolean;
  welcome: FeatDefaultWithTemplates;
  farewell: FeatDefaultWithTemplates;
}
