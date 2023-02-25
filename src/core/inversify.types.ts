export const TYPES = {
	App: Symbol.for('App'),

	///App Service
	LanguageFilter: Symbol.for('LanguageFilter'),
	ViolationRepository: Symbol.for('ViolationRepository'),
	TextLogRepository: Symbol.for('TextLogRepository'),
	CommandService: Symbol.for('CommandsService'),
	WakeService: Symbol.for('WakeService'),
	PortalService: Symbol.for('PortalService'),
	RolesService: Symbol.for('RolesService'),
	
	///VALORANT Service
	ValorantService: Symbol.for('ValorantService'),
	
	///Game Service
	GameService: Symbol.for('GameService'),
	RPSGameService: Symbol.for('RPSGameService'),
	
	///Conversation Service
	ConversationService: Symbol.for('ConversationService'),

	///Math Service
	MathService: Symbol.for('MathService'),

	///image Service
	imageService: Symbol.for('imageService'),
	
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
	ServerRepo: Symbol.for('ServerRepo'),
	
	///Shared Service
	SharedService: Symbol.for('SharedService'),
	RedisService: Symbol.for('RedisService'),
	ResponseService: Symbol.for('ResponseService'),
	ActionService: Symbol.for('ActionService'),
	LoggerService: Symbol.for('LoggerService'),
	UtilityService: Symbol.for('UtilityService'),
	FeatureFlagService: Symbol.for('FeatureFlagService'),
};