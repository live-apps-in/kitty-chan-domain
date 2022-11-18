"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TextLog = new mongoose_1.Schema({
    userId: String,
    avatar: String,
    username: String,
    guildId: String,
    channelId: String,
    count: {
        type: Number,
        default: 1
    }
});
exports.default = (0, mongoose_1.model)('text_log', TextLog);
