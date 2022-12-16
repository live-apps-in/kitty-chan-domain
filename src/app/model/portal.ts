
import { model, Schema } from 'mongoose';


export interface IPortal{
    guild: string[],
    pass: string
}

const Portal: Schema = new Schema({
	guild: {
		type: Array<string>,
		default: []
	},

	pass: String
});

export default model<IPortal>('portal', Portal);