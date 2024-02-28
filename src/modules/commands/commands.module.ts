import { Module } from '@nestjs/common';
import { SharedModule } from 'src/common/services/shared.module';
import { CommandService } from 'src/modules/commands/commands.service';
import { DiscordProvider } from 'src/providers/discord.provider';

@Module({
  imports: [SharedModule],
  providers: [CommandService, DiscordProvider],
  exports: [CommandService],
})
export class CommandsModule {}
