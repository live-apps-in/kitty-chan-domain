"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
///Controller
require("../api/controller/app.controller");
require("../api/controller/text.controller");
require("../api/controller/dashboard.controller");
require("../api/controller/alexa.controller");
const languageFilter_service_1 = require("../app/service/languageFilter.service");
const inversify_types_1 = require("./inversify.types");
const app_1 = require("../app/app");
const response_service_1 = require("../app/service/shared/response.service");
const shared_service_1 = require("../app/shared/shared.service");
const violation_repo_1 = require("../app/repository/violation.repo");
const logger_service_1 = require("../app/service/logger.service");
const textLogRepo_1 = require("../app/repository/textLogRepo");
const whitelist_service_1 = require("../app/service/shared/whitelist.service");
const commands_service_1 = require("../app/service/commands.service");
const action_service_1 = require("../app/service/shared/action.service");
const analytics_service_1 = require("../api/service/analytics.service");
const wake_service_1 = require("../app/service/wake.service");
const alexa_service_1 = require("../api/service/alexa.service");
const valorant_service_1 = require("../app/service/valorant/valorant.service");
const utils_service_1 = require("../app/service/shared/utils.service");
const container = new inversify_1.Container({
    defaultScope: 'Singleton'
});
///App Service
container.bind(inversify_types_1.TYPES.App).to(app_1.App);
container.bind(inversify_types_1.TYPES.LanguageFilter).to(languageFilter_service_1.LanguageFilter);
container.bind(inversify_types_1.TYPES.ResponseService).to(response_service_1.ResponseService);
container.bind(inversify_types_1.TYPES.ViolationRepository).to(violation_repo_1.ViolationRepository);
container.bind(inversify_types_1.TYPES.TextLogRepository).to(textLogRepo_1.TextLogRepository);
container.bind(inversify_types_1.TYPES.CommandService).to(commands_service_1.CommandService);
container.bind(inversify_types_1.TYPES.WakeService).to(wake_service_1.WakeService);
///VALORANT Service
container.bind(inversify_types_1.TYPES.ValorantService).to(valorant_service_1.ValorantService);
///API Service
container.bind(inversify_types_1.TYPES.AnalyticsService).to(analytics_service_1.AnalyticsService);
container.bind(inversify_types_1.TYPES.AlexaService).to(alexa_service_1.AlexaService);
///Shared Service
container.bind(inversify_types_1.TYPES.SharedService).to(shared_service_1.SharedService);
container.bind(inversify_types_1.TYPES.ActionService).to(action_service_1.ActionService);
container.bind(inversify_types_1.TYPES.LoggerService).to(logger_service_1.LoggerService);
container.bind(inversify_types_1.TYPES.UtilityService).to(utils_service_1.UtilityService);
container.bind(inversify_types_1.TYPES.WhiteListService).to(whitelist_service_1.WhiteListService);
exports.default = container;
