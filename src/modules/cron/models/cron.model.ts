import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CronModuleTypes } from 'src/modules/cron/enum/cron-modules.enum';

@Schema()
export class Cron {
  @Prop({ enum: CronModuleTypes })
  module: CronModuleTypes;

  @Prop()
  expression: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CronSchema = SchemaFactory.createForClass(Cron);
