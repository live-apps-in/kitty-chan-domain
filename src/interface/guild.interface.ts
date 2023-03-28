export interface IMessageReaction{
        guildId?: string,
        channelId?: string,
        messageId?: string,
        userId?: string,
        messageContent?: string,
        isBot?: boolean,
        emoji?: IEmoji,
}

export interface IEmoji{
        name: string,
        id: string,
        animated: boolean,
        createdAt?: Date
}