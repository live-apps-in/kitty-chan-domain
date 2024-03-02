import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { GuildModule } from 'src/modules/guild/guild.module';
import { LanguageFilter } from 'src/modules/language/language-filter.service';
import { LanguageProcessorService } from 'src/modules/language/language-processor.service';
import { LanguageLibsSchema } from 'src/modules/language/models/language_libs.model';
import { SharedModule } from 'src/common/services/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'language_libs', schema: LanguageLibsSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
    GuildModule,
    SharedModule,
  ],
  providers: [LanguageFilter, LanguageProcessorService],
  exports: [LanguageFilter],
})
export class LanguageModule {}
