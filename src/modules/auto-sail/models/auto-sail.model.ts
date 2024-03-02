import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoSailConfigDto } from 'src/modules/auto-sail/dto/auto-sail-config.dto';
import { AutoSailTriggerType } from 'src/modules/auto-sail/enum/auto-sail-trigger-type.enum';

@Schema()
export class AutoSail {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: AutoSailTriggerType;

  @Prop()
  guildId: string;

  @Prop()
  userId: string;

  @Prop({ type: Object })
  config: AutoSailConfigDto;

  @Prop({ default: false })
  isActive: boolean;
}

export const AutoSailSchema = SchemaFactory.createForClass(AutoSail);
