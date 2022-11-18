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
exports.CommandService = void 0;
const inversify_1 = require("inversify");
require("dotenv/config");
const inversify_types_1 = require("../../core/inversify.types");
const action_service_1 = require("./shared/action.service");
const valorant_ranks_1 = require("../data/valorant/valorant_ranks");
const response_service_1 = require("./shared/response.service");
const reply_1 = require("../enum/reply");
const rank_content_1 = require("../content/rank.content");
const utils_service_1 = require("./shared/utils.service");
let CommandService = class CommandService {
    constructor(actionService, responseService, utilityService) {
        this.actionService = actionService;
        this.responseService = responseService;
        this.utilityService = utilityService;
        this.kitty_chan_id = process.env.KITTY_CHAN_ID;
    }
    ///Validate and Filter Command
    validateCommand(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = (guild.messageContent).trim().toLowerCase();
            let messageChunk = message.split(' ');
            messageChunk = messageChunk.filter(element => {
                return element !== '';
            });
            ///Check if kitty tagged
            if (messageChunk[0] !== `<@${this.kitty_chan_id}>`)
                return;
            ///Check Rank Set Command
            if (messageChunk[1] === 'rank') {
                yield this.set_rank(guild, messageChunk[2]);
                return;
            }
            ///Flip a coin
            if (messageChunk[1] === 'flip') {
                yield this.flip_a_coin(guild, messageChunk);
                return;
            }
        });
    }
    set_rank(guild, rank) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!rank) {
                yield this.responseService.respond({
                    type: reply_1.REPLY.replyMessage,
                    guild,
                    body: {
                        content: rank_content_1.RANK_MESSAGES.invalid_rank,
                        message_reference: {
                            message_id: guild.messageId
                        }
                    }
                });
                return;
            }
            ///Validate & Assign Roles
            let isRoleValid = false;
            for (let index = 0; index < valorant_ranks_1.VALORANT_RANK.length; index++) {
                const element = valorant_ranks_1.VALORANT_RANK[index];
                if (element.toLowerCase() === rank.toLowerCase()) {
                    ///Call API
                    yield this.actionService.call({
                        type: 'setRole',
                        guild,
                        body: {
                            roleId: valorant_ranks_1.VALORANT_RANK_ROLES[element]
                        }
                    });
                    isRoleValid = true;
                    break;
                }
            }
            if (!isRoleValid) {
                yield this.responseService.respond({
                    type: reply_1.REPLY.replyMessage,
                    guild,
                    body: {
                        content: rank_content_1.RANK_MESSAGES.invalid_rank,
                        message_reference: {
                            message_id: guild.messageId
                        }
                    }
                });
                return;
            }
            else {
                yield this.responseService.respond({
                    type: reply_1.REPLY.replyMessage,
                    guild,
                    body: {
                        content: rank_content_1.RANK_MESSAGES.after_setRank,
                        message_reference: {
                            message_id: guild.messageId
                        }
                    }
                });
                return;
            }
        });
    }
    flip_a_coin(guild, messageChunk) {
        return __awaiter(this, void 0, void 0, function* () {
            if (messageChunk[2] !== "a" && messageChunk[3] !== "coin")
                return;
            // const dummy = await this.utilityService.match_wake_phrase(messageChunk, flip_coin_wake_word)
            // console.log(dummy)
            // return;
            let response = {};
            if (Math.random() < 0.50) {
                response = {
                    outcome: 'heads',
                    message: 'It\'s Heads!'
                };
            }
            else {
                response = {
                    outcome: 'tails',
                    message: 'It\'s Tails!'
                };
            }
            yield this.responseService.respond({
                type: reply_1.REPLY.replyMessage,
                guild,
                body: {
                    content: response.message,
                    message_reference: {
                        message_id: guild.messageId
                    }
                }
            });
            return;
        });
    }
};
CommandService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.ActionService)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.ResponseService)),
    __param(2, (0, inversify_1.inject)(inversify_types_1.TYPES.UtilityService)),
    __metadata("design:paramtypes", [action_service_1.ActionService,
        response_service_1.ResponseService,
        utils_service_1.UtilityService])
], CommandService);
exports.CommandService = CommandService;
