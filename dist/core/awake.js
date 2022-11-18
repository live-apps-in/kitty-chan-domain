"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
//////Keep Heroku server awake by sending API calls every 2 mins
setInterval(() => {
    axios_1.default.get('https://kitty-chan-discord.herokuapp.com/ping')
        .then(res => console.log(res.data))
        .catch(err => { });
}, 12000);
