"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGuild = void 0;
class IGuild {
    constructor(guildId, channelId, messageId, userId, username, avatar, messageContent, isBot, payload) {
        this.guildId = guildId;
        this.channelId = channelId;
        this.messageId = messageId;
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.messageContent = messageContent;
        this.isBot = isBot;
        this.payload = payload;
    }
}
exports.IGuild = IGuild;
