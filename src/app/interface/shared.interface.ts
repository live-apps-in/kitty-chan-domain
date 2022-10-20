export class IGuild{
	constructor(
        public guildId: string,
        public channelId: string,
        public messageId: string,
        public messageContent: string,
        public userId: string,
        public isBot: boolean
	){}
}