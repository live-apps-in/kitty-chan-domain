
import { model, Schema } from 'mongoose';


export interface IKittyChan{
    messageCount: number
}

const KittyChan: Schema = new Schema({
	messageCount: Number
});

export default model<IKittyChan>('kitty_chan', KittyChan);