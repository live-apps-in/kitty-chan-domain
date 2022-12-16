import { model, Schema } from 'mongoose';

export interface IFeatureFlag{
    guildId: string,
    features: any
}

const FeatureFlag = new Schema({
	guidId: String,
	features: Object
});


export default model<IFeatureFlag>('feature_flag', FeatureFlag);