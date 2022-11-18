"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ViolationSchema = new mongoose_1.Schema({
    userId: String,
    username: String,
    guildId: String,
    channelId: String,
    type: String,
    count: {
        type: Number,
        default: 1
    }
});
exports.default = (0, mongoose_1.model)('violation', ViolationSchema);
