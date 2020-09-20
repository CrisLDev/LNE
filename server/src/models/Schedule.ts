import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    title: String,
    date: String,
}, {timestamps: true});

export interface ISchedule extends Document{
    title: string,
    date: string,
}

export default model<ISchedule>('Schedule', schema);