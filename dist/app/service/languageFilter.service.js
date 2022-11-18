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
exports.LanguageFilter = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const strong_language_1 = require("../data/strong_language");
const hinglish_1 = require("../data/hinglish");
const inversify_types_1 = require("../../core/inversify.types");
const response_service_1 = require("./shared/response.service");
const shared_interface_1 = require("../interface/shared.interface");
const reply_1 = require("../enum/reply");
const logger_service_1 = require("./logger.service");
const violations_1 = require("../enum/violations");
const whitelist_service_1 = require("./shared/whitelist.service");
require('dotenv/config');
let LanguageFilter = class LanguageFilter {
    constructor(responseService, LoggerService, whiteListService) {
        this.responseService = responseService;
        this.LoggerService = LoggerService;
        this.whiteListService = whiteListService;
    }
    ///Non-English Detection
    non_english_detection(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            this.whiteListService.validate();
            let { messageContent } = guild;
            messageContent = messageContent.toLowerCase().trim();
            const messageChunk = messageContent.split(' ');
            let isNonEnglish = false;
            messageChunk.map((e) => {
                if (hinglish_1.hinglish_words.includes(e))
                    isNonEnglish = true;
            });
            if (isNonEnglish) {
                yield this.responseService.respond({
                    type: reply_1.REPLY.addReaction,
                    guild,
                    body: {
                        emoji: '%E2%9A%A0%EF%B8%8F'
                    }
                });
                ///Log Violation
                yield this.LoggerService.violation_logger(guild, violations_1.VIOLATIONS.non_english);
            }
            return isNonEnglish;
        });
    }
    ///Strong Language Detection
    strong_language_detection(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            let { messageContent } = guild;
            messageContent = messageContent.toLowerCase().trim();
            const messageChunk = messageContent.split(' ');
            let isStrongLanguage = false;
            messageChunk.map((e) => {
                if (strong_language_1.bad_words.includes(e))
                    isStrongLanguage = true;
            });
            if (isStrongLanguage) {
                yield this.responseService.respond({
                    type: reply_1.REPLY.addReaction,
                    guild,
                    body: {
                        emoji: '%E2%9A%A0%EF%B8%8F'
                    }
                });
                ///Log Violation
                yield this.LoggerService.violation_logger(guild, violations_1.VIOLATIONS.strong_language);
            }
            return isStrongLanguage;
        });
    }
};
__decorate([
    (0, whitelist_service_1.middleware)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_interface_1.IGuild]),
    __metadata("design:returntype", Promise)
], LanguageFilter.prototype, "non_english_detection", null);
LanguageFilter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.ResponseService)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.LoggerService)),
    __param(2, (0, inversify_1.inject)(inversify_types_1.TYPES.WhiteListService)),
    __metadata("design:paramtypes", [response_service_1.ResponseService,
        logger_service_1.LoggerService,
        whitelist_service_1.WhiteListService])
], LanguageFilter);
exports.LanguageFilter = LanguageFilter;
