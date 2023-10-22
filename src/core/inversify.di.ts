import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from './inversify.types';
import { App } from '../modules/app';
import { SharedService } from '../common/services/shared.service';
import { GuildStatsService } from '../modules/stats/guild_stats.service';
import { CommandService } from '../modules/commands/commands.service';
import { UtilityService } from '../common/services/utils.service';
import { ConversationService } from '../modules/conversation/conversation.service';
import { ConversationRepository } from '../repository/conversation.repo';
import { GuildRepo } from '../repository/guild.repo';
import { FeatureFlagService } from '../common/services/featureFlag.service';
import { PortalService } from '../modules/portal/portal.service';
import { RolesService } from '../modules/roles/roles.service';
import { RedisService } from '../common/services/redis.service';
import { QueueService } from '../common/services/queue.service';
import { GuildService } from '../modules/guild/guild.service';
import { ServiceStatus } from '../common/services/service_status.service';
import { WelcomerService } from '../modules/greet/welcomer.service';
import { LoggerService } from '../modules/logger/logger.service';
import { DiscordTemplateService } from '../common/services/discord_template.service';
import { TemplateRepo } from '../repository/template.repo';
import { LanguageFilter } from '../modules/language/languageFilter.service';
import { AxiosService } from '../common/services/axios.service';
import { DataStructure } from '../common/services/dataStructure.service';
import { DiscordActionService } from '../common/services/discord_action.service';
import { FeaturesRepo } from '../modules/features/repo/features.repo';

const container = new Container({
  defaultScope: 'Singleton',
});

/**App services */
container.bind<App>(TYPES.App).to(App);
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter);
container.bind<CommandService>(TYPES.CommandService).to(CommandService);
container.bind<PortalService>(TYPES.PortalService).to(PortalService);
container.bind<RolesService>(TYPES.RolesService).to(RolesService);
container.bind<GuildService>(TYPES.GuildService).to(GuildService);
container.bind<WelcomerService>(TYPES.WelcomerService).to(WelcomerService);
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);

/**Conversation Service */
container
  .bind<ConversationService>(TYPES.ConversationService)
  .to(ConversationService);

/**Repository */
container
  .bind<ConversationRepository>(TYPES.ConversationRepository)
  .to(ConversationRepository);
container.bind<GuildRepo>(TYPES.GuildRepo).to(GuildRepo);
container.bind<TemplateRepo>(TYPES.TemplateRepo).to(TemplateRepo);
container.bind<FeaturesRepo>(TYPES.FeaturesRepo).to(FeaturesRepo);

/**Shared Service */
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<AxiosService>(TYPES.AxiosService).to(AxiosService);
container.bind<RedisService>(TYPES.RedisService).to(RedisService);
container.bind<QueueService>(TYPES.QueueService).to(QueueService);
container
  .bind<GuildStatsService>(TYPES.GuildStatsService)
  .to(GuildStatsService);
container.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
container
  .bind<FeatureFlagService>(TYPES.FeatureFlagService)
  .to(FeatureFlagService);
container.bind<ServiceStatus>(TYPES.ServiceStatus).to(ServiceStatus);
container
  .bind<DiscordTemplateService>(TYPES.DiscordTemplateService)
  .to(DiscordTemplateService);
container.bind<DataStructure>(TYPES.DataStructureService).to(DataStructure);
container
  .bind<DiscordActionService>(TYPES.DiscordActionService)
  .to(DiscordActionService);

export default container;
