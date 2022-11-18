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
exports.WakeService = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../core/inversify.types");
const rank_content_1 = require("../content/rank.content");
const valorant_call_1 = require("../data/valorant/valorant_call");
const valorant_1 = require("../data/wake_words/valorant");
const reply_1 = require("../enum/reply");
const response_service_1 = require("./shared/response.service");
const valorant_service_1 = require("./valorant/valorant.service");
let WakeService = class WakeService {
    constructor(responseService, valorantService) {
        this.responseService = responseService;
        this.valorantService = valorantService;
    }
    validate(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageChunk = guild.messageContent.split(' ');
            ///Find Valorant Players
            const isFindValPlayerCommand = yield this.find_val_players(messageChunk, guild);
            if (isFindValPlayerCommand)
                return;
        });
    }
    find_val_players(messageChunk, guild) {
        return __awaiter(this, void 0, void 0, function* () {
            let isValidCalSign = false;
            let isComp = false;
            messageChunk.map(e => {
                if (valorant_1.valorant_call_signs.includes(e.toLowerCase()))
                    isValidCalSign = true;
                if (valorant_1.valorant_comp_calls.includes(e.toLowerCase()))
                    isComp = true;
            });
            ///Return if no match
            if (!isValidCalSign)
                return false;
            ///Check for Wake words
            let isMatch = false;
            const valorant_wake_sentence = isComp ? valorant_call_1.valorant_find_player_comp : valorant_call_1.valorant_find_player_unranked;
            for (let index = 0; index < valorant_wake_sentence.length; index++) {
                if (isMatch)
                    break;
                //Length of single wake word array
                const wakeWordCount = valorant_wake_sentence[index].length;
                let matchCount = 0;
                const temp_wake_words = [...valorant_wake_sentence[index]];
                //Loop Single Wake word array
                for (let i = 0; i < temp_wake_words.length; i++) {
                    if (isMatch)
                        break;
                    const wakeWord = temp_wake_words[i];
                    //Loop message chunk
                    for (let j = 0; j < messageChunk.length; j++) {
                        const element = messageChunk[j].toLowerCase();
                        if (wakeWord === element) {
                            temp_wake_words[i] = '';
                            matchCount += 1;
                        }
                    }
                    if (matchCount >= wakeWordCount)
                        isMatch = true;
                }
            }
            if (!isMatch)
                return false;
            ///Notify content for Unranked and Comp
            let replyContent = (0, rank_content_1.find_valo_unranked_template)(guild);
            if (isComp)
                replyContent = yield (0, rank_content_1.find_valo_comp_template)(guild);
            yield this.responseService.respond({
                guild,
                type: reply_1.REPLY.replyMessage,
                body: {
                    content: replyContent,
                    message_reference: {
                        message_id: guild.messageId
                    }
                }
            });
            return true;
        });
    }
};
WakeService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.ResponseService)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.ValorantService)),
    __metadata("design:paramtypes", [response_service_1.ResponseService,
        valorant_service_1.ValorantService])
], WakeService);
exports.WakeService = WakeService;
