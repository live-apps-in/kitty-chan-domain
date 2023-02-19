import { CategoryChannel } from 'discord.js';
import { Request } from 'express';

/**
 * Custom Request Payload Type for Express
 */
export interface Req extends Request{
    userData: any
}

/**
 * Discord Channel Category
 */
export interface CustomChannelCategory extends CategoryChannel{
    messages: MessageChannel
}