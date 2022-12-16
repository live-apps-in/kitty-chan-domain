import { model, Schema } from 'mongoose';

export interface IFeatureFlag{
    name: string
    guildId: string,
    features: any,
    portal: any
}

const FeatureFlag = new Schema({
	name: String,
	guildId: String,
	features: Object,
	portal: Object
});


export default model<IFeatureFlag>('feature_flag', FeatureFlag);