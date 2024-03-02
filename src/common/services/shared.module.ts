import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiosService } from 'src/common/services/connectivity/axios.service';
import { EsService } from 'src/common/services/connectivity/es.service';
import { RedisService } from 'src/common/services/connectivity/redis.service';
import { DataStructure } from 'src/common/services/data-structure.service';
import { DiscordActionService } from 'src/common/services/discord-action.service';
import { HealthService } from 'src/common/services/health.service';
import { UtilityService } from 'src/common/services/utils.service';
import { Guild, GuildSchema } from 'src/modules/guild/models/guild.model';
import { GuildRepository } from 'src/modules/guild/repository/guild.respository';
import { DiscordProvider } from 'src/providers/discord.provider';
import { EsProvider } from 'src/providers/es.provider';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guild.name,
        schema: GuildSchema,
      },
    ]),
  ],
  providers: [
    RedisProvider,
    EsProvider,
    DiscordProvider,
    AxiosService,
    EsService,
    RedisService,
    DataStructure,
    DiscordActionService,
    HealthService,
    GuildRepository,
    UtilityService,
  ],
  exports: [
    DiscordProvider,
    RedisProvider,
    EsProvider,
    AxiosService,
    EsService,
    RedisService,
    DataStructure,
    DiscordActionService,
    HealthService,
    UtilityService,
  ],
})
export class SharedModule {}
