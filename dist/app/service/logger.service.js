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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../core/inversify.types");
const text_log_1 = __importDefault(require("../model/text_log"));
const textLogRepo_1 = require("../repository/textLogRepo");
const violation_repo_1 = require("../repository/violation.repo");
let LoggerService = class LoggerService {
    constructor(violationRepo, textLogRepo) {
        this.violationRepo = violationRepo;
        this.textLogRepo = textLogRepo;
    }
    text_count_logger(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            const getTextLog = yield this.textLogRepo.count_text_log(guild.userId, guild.guildId);
            if (getTextLog === 0) {
                yield this.textLogRepo.create({
                    userId: guild.userId,
                    username: guild.username,
                    guildId: guild.guildId,
                    channelId: guild.channelId,
                    avatar: guild.avatar
                });
            }
            else {
                yield this.textLogRepo.update(guild.userId, guild.guildId);
                yield text_log_1.default.updateOne({ guildId: guild.guildId, userId: guild.userId }, {
                    avatar: guild.avatar
                });
            }
        });
    }
    violation_logger(guild, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const getViolation = yield this.violationRepo.countViolationByType(guild.userId, guild.guildId, type);
            if (getViolation === 0) {
                yield this.violationRepo.create({
                    userId: guild.userId,
                    username: guild.username,
                    guildId: guild.guildId, type: type,
                    channelId: guild.channelId
                });
            }
            else {
                yield this.violationRepo.update(guild.userId, guild.guildId, type);
            }
        });
    }
};
LoggerService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.ViolationRepository)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.TextLogRepository)),
    __metadata("design:paramtypes", [violation_repo_1.ViolationRepository,
        textLogRepo_1.TextLogRepository])
], LoggerService);
exports.LoggerService = LoggerService;
