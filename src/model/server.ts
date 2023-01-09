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
	features: {
		type: Object,
		default: {
			strongLanguage: false,
			hindi: false,
			valorant_find_players: false,
			valorant_set_rank: false
		}
	},
	portal: Object,
	messageCount: { type: Number, bigint: true, default: 0 }
});


export default model<IServer>('server', Server);