import { model, Schema } from 'mongoose';


export interface IViolation{
	userId: string
	guildId: string
    type: string
    count: number
}

const ViolationSchema: Schema = new Schema({
	userId: String,
	guildId: String,
	type: String,
	count: {
		type: Number,
		default: 1
	}
});

export default model<IViolation>('violation', ViolationSchema);