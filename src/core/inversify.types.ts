export const TYPES = {
	App: Symbol('App'),

	///Service
	LanguageFilter: Symbol('LanguageFilter'),
	ViolationRepository: Symbol('ViolationRepository'),
	TextLogRepository: Symbol('TextLogRepository'),
	CommandService: Symbol('CommandsService'),
	
	///Shared Service
	SharedService: Symbol('SharedService'),
	ResponseService: Symbol('ResponseService'),
	ActionService: Symbol('ActionService'),
	LoggerService: Symbol('LoggerService'),
	WhiteListService: Symbol('WhiteListService')
};