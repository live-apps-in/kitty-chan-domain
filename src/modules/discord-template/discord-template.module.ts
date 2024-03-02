import { Module } from '@nestjs/common';
import { SharedModule } from 'src/common/services/shared.module';
import { DiscordTemplateService } from 'src/modules/discord-template/discord-template.service';

@Module({
  imports: [SharedModule],
  providers: [DiscordTemplateService],
  exports: [DiscordTemplateService],
})
export class DiscordTemplateModule {}
