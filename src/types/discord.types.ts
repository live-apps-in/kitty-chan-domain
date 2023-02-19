

/**
 * Message Embeds
 */
export type DiscordEmbeds={
    title?: string
    type?: string
    description?: string
    url?: string
    timestamp?: string
    color?	: string
    footer?: string
    image?	: string
    thumbnail?: string
    video?: string
    provider?: string
    author?: string
    fields?: string[]
}

export type DiscordEmbedFields = {
    name: string,
    value: string,
    inline?: boolean
}