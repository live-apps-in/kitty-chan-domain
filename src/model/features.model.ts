import { model, Schema } from 'mongoose';

export interface IFeature {
  guildId: string;
  logger: any;
  greet: any;
}

const Feature = new Schema({
  guildId: String,
  logger: Object,
  greet: Object,
});

export default model<IFeature>('feature', Feature);
