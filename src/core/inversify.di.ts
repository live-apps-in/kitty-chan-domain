import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from './inversify.types';
import { App } from '../modules/app';
import { SharedService } from '../modules/service/shared/shared.service';
import { ViolationRepository } from '../repository/violation.repo';
import { StatsLoggerService } from '../modules/service/stats_logger.service';
import { TextLogRepository } from '../repository/textLogRepo';
import { CommandService } from '../modules/commands/commands.service';
import { AnalyticsService } from '../api/service/analytics.service';
import { WakeService } from '../modules/service/wake.service';
import { AlexaService } from '../api/service/alexa.service';
import { UtilityService } from '../modules/service/shared/utils.service';
import { ConversationService } from '../modules/service/conversation/conversation.service';
import { ConversationAPIService } from '../api/service/conversation/conversation_api.service';
import { ConversationRepository } from '../repository/conversation.repo';
import { GuildRepo } from '../repository/guild.repo';
import { FeatureFlagService } from '../modules/service/shared/featureFlag.service';
import { PortalService } from '../modules/service/portal.service';
import { GamesService } from '../modules/service/games/games.service';
import { RPSGameService } from '../modules/service/games/RPSGame.service';
import { RolesService } from '../modules/service/roles/roles.service';
import { RedisService } from '../shared/redis.service';
import { QueueService } from '../shared/queue.service';
import { GuildService } from '../modules/service/guild.service';
import { ServiceStatus } from '../modules/service/shared/service_status.service';

///Controller
import '../api/controller/app.controller';
import '../api/controller/text.controller';
import '../api/controller/dashboard.controller';
import '../api/controller/alexa.controller';
import '../api/controller/conversation/conversation.controller';
import { WelcomerService } from '../modules/service/welcomer.service';
import { LoggerService } from '../modules/service/logger.service';
import { DiscordTemplateService } from '../modules/service/shared/discord_template.service';
import { TemplateRepo } from '../repository/template.repo';
import { LanguageFilter } from '../modules/language/languageFilter.service';

const container = new Container({
  defaultScope: 'Singleton',
});

/**App services */
container.bind<App>(TYPES.App).to(App);
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter);
container
  .bind<ViolationRepository>(TYPES.ViolationRepository)
  .to(ViolationRepository);
container
  .bind<TextLogRepository>(TYPES.TextLogRepository)
  .to(TextLogRepository);
container.bind<CommandService>(TYPES.CommandService).to(CommandService);
container.bind<WakeService>(TYPES.WakeService).to(WakeService);
container.bind<PortalService>(TYPES.PortalService).to(PortalService);
container.bind<RolesService>(TYPES.RolesService).to(RolesService);
container.bind<GuildService>(TYPES.GuildService).to(GuildService);
container.bind<WelcomerService>(TYPES.WelcomerService).to(WelcomerService);
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);

/**Game Services */
container.bind<GamesService>(TYPES.GameService).to(GamesService);
container.bind<RPSGameService>(TYPES.RPSGameService).to(RPSGameService);

/**Conversation Service */
container
  .bind<ConversationService>(TYPES.ConversationService)
  .to(ConversationService);

/**API Services */
container.bind<AnalyticsService>(TYPES.AnalyticsService).to(AnalyticsService);
container.bind<AlexaService>(TYPES.AlexaService).to(AlexaService);
container
  .bind<ConversationAPIService>(TYPES.ConversationAPIService)
  .to(ConversationAPIService);

/**Repository */
container
  .bind<ConversationRepository>(TYPES.ConversationRepository)
  .to(ConversationRepository);
container.bind<GuildRepo>(TYPES.GuildRepo).to(GuildRepo);
container.bind<TemplateRepo>(TYPES.TemplateRepo).to(TemplateRepo);

/**Shared Service */
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<RedisService>(TYPES.RedisService).to(RedisService);
container.bind<QueueService>(TYPES.QueueService).to(QueueService);
container
  .bind<StatsLoggerService>(TYPES.StatsLoggerService)
  .to(StatsLoggerService);
container.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
container
  .bind<FeatureFlagService>(TYPES.FeatureFlagService)
  .to(FeatureFlagService);
container.bind<ServiceStatus>(TYPES.ServiceStatus).to(ServiceStatus);
container
  .bind<DiscordTemplateService>(TYPES.DiscordTemplateService)
  .to(DiscordTemplateService);

export default container;
