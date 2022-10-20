import { model, Schema } from 'mongoose';


export interface TextLog{
    userId: string
    count: number
}

const TextLog: Schema = new Schema({
	userId: String,
	count: {
		type: Number,
		default: 1
	}
});

export default model<TextLog>('text_log', TextLog);