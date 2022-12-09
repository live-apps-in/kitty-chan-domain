import { model, Schema, Types } from 'mongoose';



export interface IConversationPhrase{
    tag: string;
    phrase: string;
    resPhraseId: string[];
}

const ConversationSchema = new Schema({
	tag: String,
	phrase: String,
	resPhraseId: [Types.ObjectId]
});


const conversationModel = model<IConversationPhrase>('conversation_phrase', ConversationSchema);
export default conversationModel