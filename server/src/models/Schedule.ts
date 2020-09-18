import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    user_id: {type: ObjectId, ref: 'User'},
    title: String,
    date: Date,
}, {timestamps: true});

export interface ISchedule extends Document{
    user_id: any,
    title: string,
    date: Date,
}

export default model<ISchedule>('Schedule', schema);