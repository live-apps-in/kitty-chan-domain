"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UtilityService = void 0;
const inversify_1 = require("inversify");
let UtilityService = class UtilityService {
    match_wake_phrase(messageChunk, phraseLib) {
        return __awaiter(this, void 0, void 0, function* () {
            let isMatch = false;
            for (let index = 0; index < phraseLib.length; index++) {
                if (isMatch)
                    break;
                //Length of single wake word array
                const wakeWordCount = phraseLib[index].length;
                let matchCount = 0;
                const temp_wake_words = [...phraseLib[index]];
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
            return isMatch;
        });
    }
};
UtilityService = __decorate([
    (0, inversify_1.injectable)()
], UtilityService);
exports.UtilityService = UtilityService;
