import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import {
  DiscordTemplate,
  DiscordTemplateSchema,
} from 'src/modules/discord-template/models/discord-template.model';
import { WelcomerService } from 'src/modules/greet/welcomer.service';
import { Guild, GuildSchema } from 'src/modules/guild/models/guild.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guild.name,
        schema: GuildSchema,
      },
      {
        name: DiscordTemplate.name,
        schema: DiscordTemplateSchema,
      },
    ]),
    SharedModule,
  ],
  providers: [WelcomerService],
  exports: [WelcomerService],
})
export class GreetModule {}
