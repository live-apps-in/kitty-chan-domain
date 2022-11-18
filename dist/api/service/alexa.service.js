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
exports.AlexaService = void 0;
const inversify_1 = require("inversify");
const reply_1 = require("../../app/enum/reply");
const response_service_1 = require("../../app/service/shared/response.service");
const inversify_types_1 = require("../../core/inversify.types");
const text_types_1 = require("../types/text.types");
let AlexaService = class AlexaService {
    constructor(responseService) {
        this.responseService = responseService;
    }
    textServer(message, username, messageType) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('text service');
            const buildMessage = yield this.buildMessage(message, username, messageType);
            console.log(buildMessage, 'build message');
            yield this.responseService.respond({
                type: reply_1.REPLY.sendMessage,
                guild: {
                    channelId: '928902191983517717' ///Need to change to dynamic - TODO
                },
                body: {
                    content: buildMessage
                }
            });
        });
    }
    buildMessage(message, username, messageType) {
        return __awaiter(this, void 0, void 0, function* () {
            let buildMessage;
            switch (messageType) {
                case text_types_1.TEXT.message:
                    buildMessage = `[ ${username} from Alexa ]: ${message}`;
                    break;
                case text_types_1.TEXT.playGame:
                    buildMessage = `[ ${username} from Alexa ]: ${username} wants to play VALORANT now!`;
                    break;
                default:
                    break;
            }
            return buildMessage;
        });
    }
};
AlexaService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.ResponseService)),
    __metadata("design:paramtypes", [response_service_1.ResponseService])
], AlexaService);
exports.AlexaService = AlexaService;
