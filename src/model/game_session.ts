
import { model, Schema } from 'mongoose';


export interface IGameSession{
    userId: string,
    threadId: string,
    game_data: any,
    status: string
}

const GameSession: Schema = new Schema({
	userId: String,
	threadId: String,
	game_data: Object,
	status: { type: String, default: 'started' }
});

export default model<IGameSession>('game_session', GameSession);