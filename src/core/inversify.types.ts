export const TYPES = {
	App: Symbol.for('App'),

	///App Service
	LanguageFilter: Symbol.for('LanguageFilter'),
	ViolationRepository: Symbol.for('ViolationRepository'),
	TextLogRepository: Symbol.for('TextLogRepository'),
	CommandService: Symbol.for('CommandsService'),
	WakeService: Symbol.for('WakeService'),
	PortalService: Symbol.for('PortalService'),

	///VALORANT Service
	ValorantService: Symbol.for('ValorantService'),
	
	///Conversation Service
	ConversationService: Symbol.for('ConversationService'),

	///API Service
	AnalyticsService: Symbol.for('AnalyticsService'),
	AlexaService: Symbol.for('AlexaService'),
	ConversationAPIService: Symbol.for('ConversationAPIService'),

	///Repository
	ConversationRepository: Symbol.for('ConversationRepository'),
	ServerRepo: Symbol.for('ServerRepo'),
	
	///Shared Service
	SharedService: Symbol.for('SharedService'),
	ResponseService: Symbol.for('ResponseService'),
	ActionService: Symbol.for('ActionService'),
	LoggerService: Symbol.for('LoggerService'),
	UtilityService: Symbol.for('UtilityService'),
	WhiteListService: Symbol.for('WhiteListService'),
	FeatureFlagService: Symbol.for('FeatureFlagService'),
};