import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LanguageLibs {
  @Prop()
  name: string;

  @Prop()
  data: string[];

  @Prop({ default: false })
  system: boolean;

  @Prop()
  guildId: string;

  @Prop({ default: 'default' })
  type: string;
}

export const LanguageLibsSchema = SchemaFactory.createForClass(LanguageLibs);
