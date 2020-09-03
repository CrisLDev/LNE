import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    tracing_id: {type: ObjectId, ref: 'Tracing'},
    name: {
        type: String,
        required: true,
        min: 4
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    imgUrl: {
        type: String,
        required: true,
        min: 4
    },
    entryDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date
    }
},{
    timestamps: true
});

export interface IPatient extends Document{
    name: string,
    age: number,
    phoneNumber: number,
    email: string,
    imgUrl: string,
    entryDate: Date,
    departureDate: Date
}

export default model<IPatient>('Patient', schema);