import { Message } from 'discord.js';

export class IGuild{
	constructor(
        public guildId?: string,
        public guildName?: string,
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
export class IGuildMember{
	constructor(
        public guildId?: string,
        public userId?: string,
	){}
}

export class IMessageReaction{
	constructor(
        public guildId?: string,
        public channelId?: string,
        public messageId?: string,
        public userId?: string,
        public messageContent?: string,
        public isBot?: boolean,
        public emoji?: any,
        public payload?: Message,
	){}
}