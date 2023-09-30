import { model, Schema } from 'mongoose';
import { GreetDto } from '../../greet/dto/greet.dto';
import { LanguageDto } from '../../language/dto/language.dto';
import { PortalDto } from '../../portal/dto/portal.dto';

const featureDefaultPerms = {
  isActive: false,
  channelId: null,
  templateId: null,
};

export interface IFeature {
  guildId: string;
  logger: any;
  greet: GreetDto;
  language: LanguageDto;
  portal: PortalDto;
}

const Feature = new Schema({
  guildId: String,
  logger: {
    type: Object,
    default: featureDefaultPerms,
  },
  greet: { type: Object, default: featureDefaultPerms },
  language: { type: Object, default: { isActive: false } },
  portal: { type: Object, default: { isActive: false } },
});

export default model<IFeature>('feature', Feature);
