import { model, Schema } from 'mongoose';

export interface IFeature {
  guildId: string;
  logger: any;
  greet: any;
  language: any;
}

const Feature = new Schema({
  guildId: String,
  logger: Object,
  greet: Object,
  language: Object,
});

export default model<IFeature>('feature', Feature);
