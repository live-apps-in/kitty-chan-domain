import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  discordId: string;

  @Prop({ type: Object })
  discord: any;

  @Prop({ type: [String] })
  guilds: string[];

  @Prop()
  activityStatus: string;

  @Prop()
  activities: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
