import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GuildStaffDto } from 'src/modules/guild/dto/guild-staff.dto';

@Schema()
export class Guild {
  @Prop()
  name: string;

  @Prop()
  guildId: string;

  @Prop()
  ownerId: string;

  @Prop()
  icon: string;

  @Prop()
  membersCount: number;

  @Prop({ type: Array<GuildStaffDto>, default: [] })
  staffs: GuildStaffDto[];

  @Prop()
  tags: string[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
