"use strict";
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
exports.find_valo_comp_template = exports.find_valo_unranked_template = exports.RANK_MESSAGES = void 0;
require("reflect-metadata");
const inversify_di_1 = __importDefault(require("../../core/inversify.di"));
const inversify_types_1 = require("../../core/inversify.types");
const id_1 = require("../data/id");
exports.RANK_MESSAGES = {
    invalid_rank: ` Please enter a valid VALORANT rank!\nYou can use one of these: Unranked, Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, Immortal, Radiant\n
    Here's a valid Rank Role command ----- @kitty chan rank platinum`,
    after_setRank: 'I have updated your VALORANT Rank. Check your new Role ;)'
};
const find_valo_unranked_template = (guild) => {
    return `<@&${id_1.VALORANT_ROLE_ID}> Hello, <@${guild.userId}> wants to play VALORANT now!`;
};
exports.find_valo_unranked_template = find_valo_unranked_template;
const find_valo_comp_template = (guild) => __awaiter(void 0, void 0, void 0, function* () {
    const getMatch = yield inversify_di_1.default.get(inversify_types_1.TYPES.ValorantService).matchmaking(guild);
    const { currentRank, allowedRoleString } = getMatch;
    return `<@&${id_1.VALORANT_ROLE_ID}> Hello, <@${guild.userId}> wants to play VALORANT Competitive [${currentRank}] now!\nI'll tag suitable matching players ${allowedRoleString}`;
});
exports.find_valo_comp_template = find_valo_comp_template;
