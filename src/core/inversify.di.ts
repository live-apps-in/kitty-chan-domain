import 'reflect-metadata';
import { Container } from 'inversify';

///Controller
import '../api/controller/app.controller';
import '../api/controller/text.controller';
import '../api/controller/dashboard.controller';
import '../api/controller/alexa.controller';
import '../api/controller/conversation/conversation.controller';
import '../api/controller/feature_flag.controller';
import '../api/controller/config.controller';
/**
 * LiveCord Controller
 */
import '../api/live_cord/controller/user.controller';
import '../api/live_cord/controller/guild.controller';
import '../api/live_cord/controller/roles/roles.controller';

import { LanguageFilter } from '../app/service/languageFilter.service';
import { TYPES } from './inversify.types';
import { App } from '../app/app';
import { ResponseService } from '../app/service/shared/response.service';
import { SharedService } from '../app/shared/shared.service';
import { ViolationRepository } from '../app/repository/violation.repo';
import { LoggerService } from '../app/service/logger.service';
import { TextLogRepository } from '../app/repository/textLogRepo';
import { CommandService } from '../app/service/commands.service';
import { ActionService } from '../app/service/shared/action.service';
import { AnalyticsService } from '../api/service/analytics.service';
import { WakeService } from '../app/service/wake.service';
import { AlexaService } from '../api/service/alexa.service';
import { ValorantService } from '../app/service/valorant/valorant.service';
import { UtilityService } from '../app/service/shared/utils.service';
import { ConversationService } from '../app/service/conversation/conversation.service';
import { ConversationAPIService } from '../api/service/conversation/conversation_api.service';
import { ConversationRepository } from '../api/repository/conversation.repo';
import { ServerRepo } from '../app/repository/server.repo';
import { FeatureFlagService } from '../app/service/shared/featureFlag.service';
import { PortalService } from '../app/service/portal.service';
import { GamesService } from '../app/service/games/games.service';
import { RPSGameService } from '../app/service/games/RPSGame.service';
import { MathService } from '../app/service/math.service';
import { imageService } from '../app/service/image.service';
import { GuildAPIService } from '../api/live_cord/service/guild.service';
import { RolesAPIService } from '../api/live_cord/service/roles/roles.service';
import { RolesService } from '../app/service/roles/roles.service';
import { UserService } from '../api/live_cord/service/user.service';
import { RedisService } from '../shared/redis.service';

const container = new Container({
	defaultScope: 'Singleton'
});

///App Service
container.bind<App>(TYPES.App).to(App);
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter);
container.bind<ResponseService>(TYPES.ResponseService).to(ResponseService);
container.bind<ViolationRepository>(TYPES.ViolationRepository).to(ViolationRepository);
container.bind<TextLogRepository>(TYPES.TextLogRepository).to(TextLogRepository);
container.bind<CommandService>(TYPES.CommandService).to(CommandService);
container.bind<WakeService>(TYPES.WakeService).to(WakeService);
container.bind<PortalService>(TYPES.PortalService).to(PortalService);
container.bind<RolesService>(TYPES.RolesService).to(RolesService);

///VALORANT Service
container.bind<ValorantService>(TYPES.ValorantService).to(ValorantService);

///Game Service
container.bind<GamesService>(TYPES.GameService).to(GamesService);
container.bind<RPSGameService>(TYPES.RPSGameService).to(RPSGameService);

///Conversation Service
container.bind<ConversationService>(TYPES.ConversationService).to(ConversationService);

///Math Service
container.bind<MathService>(TYPES.MathService).to(MathService);

///image Service
container.bind<imageService>(TYPES.imageService).to(imageService);

///API Service
container.bind<AnalyticsService>(TYPES.AnalyticsService).to(AnalyticsService);
container.bind<AlexaService>(TYPES.AlexaService).to(AlexaService);
container.bind<ConversationAPIService>(TYPES.ConversationAPIService).to(ConversationAPIService);

///LiveCord Service
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<GuildAPIService>(TYPES.GuildAPIService).to(GuildAPIService);
container.bind<RolesAPIService>(TYPES.RolesAPIService).to(RolesAPIService);

///Repository
container.bind<ConversationRepository>(TYPES.ConversationRepository).to(ConversationRepository);
container.bind<ServerRepo>(TYPES.ServerRepo).to(ServerRepo);


///Shared Service
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<RedisService>(TYPES.RedisService).to(RedisService);
container.bind<ActionService>(TYPES.ActionService).to(ActionService);
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);
container.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
container.bind<FeatureFlagService>(TYPES.FeatureFlagService).to(FeatureFlagService);


export default container;