import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    user_id: {type: ObjectId, ref: 'User'},
    title:{
        type: String,
        required: true,
        min: 6
    },
    content:{
        type: String,
        required: true,
        min: 6
    }
},{
    timestamps: true
});

export interface IAskUs extends Document{
    user_id?: any;
    title: string;
    content: string;
}

export default model<IAskUs>('AskUs', schema);