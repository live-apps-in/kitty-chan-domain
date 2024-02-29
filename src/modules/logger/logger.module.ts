import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { DiscordTemplateModule } from 'src/modules/discord-template/discord-template.module';
import { DiscordTemplateSchema } from 'src/modules/discord-template/models/discord-template.model';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { LoggerService } from 'src/modules/logger/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'discord_templates', schema: DiscordTemplateSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
    DiscordTemplateModule,
    SharedModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
