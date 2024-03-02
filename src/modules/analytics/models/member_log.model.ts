import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MemberLog {
  @Prop()
  userId: string;

  @Prop()
  guildId: string;

  @Prop()
  event: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

export const MemberLogSchema = SchemaFactory.createForClass(MemberLog);
