import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiosService } from 'src/common/services/connectivity/axios.service';
import { EsService } from 'src/common/services/connectivity/es.service';
import { HealthService } from 'src/common/services/health.service';
import { RedisService } from 'src/common/services/connectivity/redis.service';
import { EventsController } from 'src/handlers/events.handler';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { FeaturesModule } from 'src/modules/features/features.module';
import { GuildModule } from 'src/modules/guild/guild.module';
import { LanguageModule } from 'src/modules/language/language.module';
import { UserModule } from 'src/modules/user/user.module';
import { DiscordProvider } from 'src/providers/discord.provider';
import { EsProvider } from 'src/providers/es.provider';
import { RedisProvider } from 'src/providers/redis.provider';
import { SharedModule } from 'src/common/services/shared.module';
import { JobModule } from 'src/jobs/jobs.module';
import { AutoSailModule } from 'src/modules/auto-sail/auto-sail.module';
import { CommandsModule } from 'src/modules/commands/commands.module';
import { LoggerModule } from 'src/modules/logger/logger.module';
import { RolesModule } from 'src/modules/roles/roles.module';
import { GreetModule } from 'src/modules/greet/greet.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    SharedModule,
    AnalyticsModule,
    GuildModule,
    UserModule,
    LanguageModule,
    FeaturesModule,
    JobModule,
    AutoSailModule,
    CommandsModule,
    LoggerModule,
    RolesModule,
    GreetModule,
  ],
  controllers: [EventsController],
  providers: [
    DiscordProvider,
    EsProvider,
    RedisProvider,
    RedisService,
    EsService,
    AxiosService,
    HealthService,
  ],
})
export class AppModule {}
