import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LanguageDto } from 'src/modules/language/dto/language.dto';
import { GreetDto } from '../../greet/dto/greet.dto';
const featureDefaultPerms = {
  isActive: false,
  channelId: null,
  templateId: null,
};

@Schema()
export class Features {
  @Prop({
    unique: true,
  })
  guildId: Types.ObjectId;

  @Prop({ type: Object, default: featureDefaultPerms })
  logger: any;

  @Prop({ type: GreetDto, default: featureDefaultPerms })
  greet: GreetDto;

  @Prop({ type: LanguageDto, default: { isActive: false } })
  language: LanguageDto;
}

export const FeaturesSchema = SchemaFactory.createForClass(Features);
