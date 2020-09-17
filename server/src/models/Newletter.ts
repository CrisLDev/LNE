import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    email: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export interface INewletter extends Document{
    email: string;
}

export default model<INewletter>('Newletter', schema);