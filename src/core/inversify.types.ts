export const TYPES = {
	App: Symbol('App'),

	///App Service
	LanguageFilter: Symbol('LanguageFilter'),
	ViolationRepository: Symbol('ViolationRepository'),
	TextLogRepository: Symbol('TextLogRepository'),
	CommandService: Symbol('CommandsService'),
	WakeService: Symbol('WakeService'),

	///VALORANT Service
	ValorantService: Symbol('ValorantService'),
	
	///API Service
	AnalyticsService: Symbol('AnalyticsService'),
	AlexaService: Symbol('AlexaService'),
	
	///Shared Service
	SharedService: Symbol('SharedService'),
	ResponseService: Symbol('ResponseService'),
	ActionService: Symbol('ActionService'),
	LoggerService: Symbol('LoggerService'),
	UtilityService: Symbol('UtilityService'),
	WhiteListService: Symbol('WhiteListService')
};