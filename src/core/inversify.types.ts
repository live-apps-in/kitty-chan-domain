export const TYPES = {
  App: Symbol.for('App'),

  ///App Service
  LanguageFilter: Symbol.for('LanguageFilter'),
  ViolationRepository: Symbol.for('ViolationRepository'),
  TextLogRepository: Symbol.for('TextLogRepository'),
  CommandService: Symbol.for('CommandsService'),
  PortalService: Symbol.for('PortalService'),
  RolesService: Symbol.for('RolesService'),
  GuildService: Symbol.for('GuildService'),
  WelcomerService: Symbol.for('WelcomerService'),
  LoggerService: Symbol.for('LoggerService'),

  ///VALORANT Service
  ValorantService: Symbol.for('ValorantService'),

  ///Game Service
  GameService: Symbol.for('GameService'),
  RPSGameService: Symbol.for('RPSGameService'),

  ///Conversation Service
  ConversationService: Symbol.for('ConversationService'),

  ///API Service
  AnalyticsService: Symbol.for('AnalyticsService'),
  AlexaService: Symbol.for('AlexaService'),
  ConversationAPIService: Symbol.for('ConversationAPIService'),

  ///LiveCord API Service
  UserService: Symbol.for('UserService'),
  GuildAPIService: Symbol.for('GuildAPIService'),
  RolesAPIService: Symbol.for('RolesAPIService'),

  ///Repository
  ConversationRepository: Symbol.for('ConversationRepository'),
  GuildRepo: Symbol.for('GuildRepo'),
  TemplateRepo: Symbol.for('TemplateRepo'),
  FeaturesRepo: Symbol.for('FeaturesRepo'),

  ///Shared Service
  SharedService: Symbol.for('SharedService'),
  AxiosService: Symbol.for('AxiosService'),
  RedisService: Symbol.for('RedisService'),
  QueueService: Symbol.for('QueueService'),
  ResponseService: Symbol.for('ResponseService'),
  StatsLoggerService: Symbol.for('StatsLoggerService'),
  UtilityService: Symbol.for('UtilityService'),
  FeatureFlagService: Symbol.for('FeatureFlagService'),
  ServiceStatus: Symbol.for('ServiceStatus'),
  DiscordTemplateService: Symbol.for('DiscordTemplateService'),
  DataStructureService: Symbol.for('DataStructureService'),
  DiscordActionService: Symbol.for('DiscordActionService'),
};
