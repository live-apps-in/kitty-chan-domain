import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GuildStaffDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  roleId: string;

  @IsNotEmpty()
  isActive: boolean;
}
