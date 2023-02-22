import { model, Schema } from 'mongoose';



export interface IConversationResponse{
    tag: string;
    phrase: string[];
}

const ConversationSchema = new Schema({
	tag: String,
	phrase: [String],
});


export default model<IConversationResponse>('conversation_response', ConversationSchema);