export const TYPES = {
  App: Symbol.for('App'),

  /**App Service */
  LanguageFilter: Symbol.for('LanguageFilter'),
  LanguageProcessorService: Symbol.for('LanguageProcessorService'),
  CommandService: Symbol.for('CommandsService'),
  PortalService: Symbol.for('PortalService'),
  RolesService: Symbol.for('RolesService'),
  GuildService: Symbol.for('GuildService'),
  WelcomerService: Symbol.for('WelcomerService'),
  LoggerService: Symbol.for('LoggerService'),
  AutoSailService: Symbol.for('AutoSailService'),
  AutoSailConfigService: Symbol.for('AutoSailConfigService'),

  /**Conversation Service */
  ConversationService: Symbol.for('ConversationService'),

  /**Repository */
  ConversationRepository: Symbol.for('ConversationRepository'),
  GuildRepo: Symbol.for('GuildRepo'),
  TemplateRepo: Symbol.for('TemplateRepo'),
  FeaturesRepo: Symbol.for('FeaturesRepo'),

  /**Shared Service */
  SharedService: Symbol.for('SharedService'),
  AxiosService: Symbol.for('AxiosService'),
  RedisService: Symbol.for('RedisService'),
  QueueService: Symbol.for('QueueService'),
  ResponseService: Symbol.for('ResponseService'),
  GuildStatsService: Symbol.for('GuildStatsService'),
  UtilityService: Symbol.for('UtilityService'),
  FeatureFlagService: Symbol.for('FeatureFlagService'),
  ServiceStatus: Symbol.for('ServiceStatus'),
  DiscordTemplateService: Symbol.for('DiscordTemplateService'),
  DataStructureService: Symbol.for('DataStructureService'),
  DiscordActionService: Symbol.for('DiscordActionService'),
  EsService: Symbol.for('EsService'),
};
