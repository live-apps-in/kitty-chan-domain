"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../core/inversify.types");
const languageFilter_service_1 = require("./service/languageFilter.service");
const discord_js_1 = require("discord.js");
require("dotenv/config");
const shared_service_1 = require("./shared/shared.service");
const logger_service_1 = require("./service/logger.service");
const commands_service_1 = require("./service/commands.service");
const wake_service_1 = require("./service/wake.service");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
});
let App = class App {
    constructor(langFilter, sharedService, loggerService, commandService, wakeService) {
        this.langFilter = langFilter;
        this.sharedService = sharedService;
        this.loggerService = loggerService;
        this.commandService = commandService;
        this.wakeService = wakeService;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            ///Connect to Discord Server
            client.on('ready', () => {
                client.user.setActivity('with Alexa');
                console.log('kitty chan connected 😸');
            });
            /////READ Messages & Respond
            client.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
                ///Extract Guild Info
                const guildInfo = yield this.sharedService.extractGuildInfo(message);
                ///Validate if Bot message
                if (guildInfo.isBot)
                    return;
                ///Non-English Detection (Only Detects Hindi)
                const isNonEnglish = yield this.langFilter.non_english_detection(guildInfo);
                if (isNonEnglish)
                    return;
                ///Strong Language Detection
                const isStrongLang = yield this.langFilter.strong_language_detection(guildInfo);
                if (isStrongLang)
                    return;
                ///Commands
                yield this.commandService.validateCommand(guildInfo);
                ///Wake Words
                yield this.wakeService.validate(guildInfo);
                ///Log Good Text Count
                yield this.loggerService.text_count_logger(guildInfo);
            }));
            client.login(process.env.KITTY_CHAN_TOKEN);
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.LanguageFilter)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.SharedService)),
    __param(2, (0, inversify_1.inject)(inversify_types_1.TYPES.LoggerService)),
    __param(3, (0, inversify_1.inject)(inversify_types_1.TYPES.CommandService)),
    __param(4, (0, inversify_1.inject)(inversify_types_1.TYPES.WakeService)),
    __metadata("design:paramtypes", [languageFilter_service_1.LanguageFilter,
        shared_service_1.SharedService,
        logger_service_1.LoggerService,
        commands_service_1.CommandService,
        wake_service_1.WakeService])
], App);
exports.App = App;
