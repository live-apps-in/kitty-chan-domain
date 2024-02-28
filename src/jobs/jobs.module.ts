import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { OnInit } from 'src/jobs/on-init';
import { LanguageLibsSchema } from 'src/modules/language/models/language_libs.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'language_libs',
        schema: LanguageLibsSchema,
      },
    ]),
    SharedModule,
  ],
  providers: [OnInit],
})
export class JobModule {}
