import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from 'src/modules/guild/models/guild.model';
import { GuildRepository } from 'src/modules/guild/repository/guild.respository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
  ],
  providers: [GuildRepository],
  exports: [GuildRepository],
})
export class GuildModule {}
