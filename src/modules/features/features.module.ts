import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Features.name, schema: FeaturesSchema },
    ]),
  ],
  providers: [],
  exports: [],
})
export class FeaturesModule {}
