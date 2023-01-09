import { model, Schema } from 'mongoose';

export interface IServer{
    name: string
    guildId: string,
    features: any,
    portal: any,
    messageCount: number
}

const Server = new Schema({
	name: String,
	guildId: String,
	features: Object,
	portal: Object,
	messageCount: Number
});


export default model<IServer>('server', Server);