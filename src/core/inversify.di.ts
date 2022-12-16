import 'reflect-metadata';
import { Container } from 'inversify';

///Controller
import '../api/controller/app.controller';
import '../api/controller/text.controller';
import '../api/controller/dashboard.controller';
import '../api/controller/alexa.controller';
import '../api/controller/conversation/conversation.controller';
import '../api/controller/feature_flag.controller';

import { LanguageFilter } from '../app/service/languageFilter.service';
import { TYPES } from './inversify.types';
import { App } from '../app/app';
import { ResponseService } from '../app/service/shared/response.service';
import { SharedService } from '../app/shared/shared.service';
import { ViolationRepository } from '../app/repository/violation.repo';
import { LoggerService } from '../app/service/logger.service';
import { TextLogRepository } from '../app/repository/textLogRepo';
import { WhiteListService } from '../app/service/shared/whitelist.service';
import { CommandService } from '../app/service/commands.service';
import { ActionService } from '../app/service/shared/action.service';
import { AnalyticsService } from '../api/service/analytics.service';
import { WakeService } from '../app/service/wake.service';
import { AlexaService } from '../api/service/alexa.service';
import { ValorantService } from '../app/service/valorant/valorant.service';
import { UtilityService } from '../app/service/shared/utils.service';
import { ConversationService } from '../app/service/conversation/conversation.service';
import { ConversationController } from '../api/controller/conversation/conversation.controller';
import { ConversationAPIService } from '../api/service/conversation/conversation_api.service';
import { ConversationRepository } from '../api/repository/conversation.repo';
import { FeatureFlagRepo } from '../app/repository/feature_flag.repo';
import { FeatureFlagService } from '../app/service/shared/featureFlag.service';

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

///VALORANT Service
container.bind<ValorantService>(TYPES.ValorantService).to(ValorantService);

///Conversation Service
container.bind<ConversationService>(TYPES.ConversationService).to(ConversationService);

///API Service
container.bind<AnalyticsService>(TYPES.AnalyticsService).to(AnalyticsService);
container.bind<AlexaService>(TYPES.AlexaService).to(AlexaService);
container.bind<ConversationAPIService>(TYPES.ConversationAPIService).to(ConversationAPIService);

///Repository
container.bind<ConversationRepository>(TYPES.ConversationRepository).to(ConversationRepository);
container.bind<FeatureFlagRepo>(TYPES.FeatureFlagRepository).to(FeatureFlagRepo);


///Shared Service
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<ActionService>(TYPES.ActionService).to(ActionService);
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);
container.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
container.bind<WhiteListService>(TYPES.WhiteListService).to(WhiteListService);
container.bind<FeatureFlagService>(TYPES.FeatureFlagService).to(FeatureFlagService);


export default container;