
import { model, Schema } from 'mongoose';


export interface IPortal{
    guild: any[]
}

const Portal: Schema = new Schema({
	guild: {
		type: Array<any>,
		default: []
	}
});

export default model<IPortal>('portal', Portal);