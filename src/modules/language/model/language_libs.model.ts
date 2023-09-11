import { model, Schema } from 'mongoose';

export interface ILanguageLibs {
  name: string;
  data: string[];
  system: boolean;
  guildId: string;
}

const LanguageLibs: Schema = new Schema({
  name: String,
  data: Array<string>,
  system: Boolean,
  guildId: String,
});

export default model<ILanguageLibs>('language_libs', LanguageLibs);
