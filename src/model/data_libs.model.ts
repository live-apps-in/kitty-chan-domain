
import { model, Schema } from 'mongoose';


export interface IDataLibs{
    name: string
    data: string[]
}

const Libraries: Schema = new Schema({
	name: String,
	data: Array<string>
});

export default model<IDataLibs>('data_libs', Libraries);