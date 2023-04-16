import { model, Schema } from 'mongoose';

export interface IKittyChan {
  messageCount: number;
}

const KittyChan: Schema = new Schema({
  messageCount: { type: Number, bigint: true, default: 0 },
});

export default model<IKittyChan>('kitty_chan', KittyChan);
