import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    title: String,
    date: String,
    participants: [
        {
            user: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ]
}, {timestamps: true});

export interface ISchedule extends Document{
    title: string,
    date: string,
}

export default model<ISchedule>('Schedule', schema);