import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CronConfigDto {
  @IsString()
  @IsNotEmpty()
  expression: string;

  @IsMongoId()
  @IsOptional()
  cronRefId: Types.ObjectId;
}
