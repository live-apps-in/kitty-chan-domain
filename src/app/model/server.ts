import { model, Schema } from 'mongoose';

export interface IServer{
    name: string
    guildId: string,
    features: any,
    portal: any
}

const Server = new Schema({
	name: String,
	guildId: String,
	features: Object,
	portal: Object
});


export default model<IServer>('server', Server);