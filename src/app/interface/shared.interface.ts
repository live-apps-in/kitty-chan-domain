import { Message } from 'discord.js';

export class IGuild{
	constructor(
        public guildId?: string,
        public channelId?: string,
        public messageId?: string,
        public userId?: string,
        public username?: string,
        public avatar?: string,
        public messageContent?: string,
        public isBot?: boolean,
        public payload?: Message,
        public featureFlag?: any,
	){}
}