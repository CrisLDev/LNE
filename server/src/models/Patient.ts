import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    tracing_id: {type: ObjectId, ref: 'Tracing'},
    name: {
        type: String,
        required: true,
        min: 4
    },
    plan: {
        type: String,
        min: 4
    },
    dni: {
        type: Number,
        required: true
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
    },
    birthDate: {
        type: Date,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    ocupation: {
        type: String,
        required: true
    },
    academicLevel: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    genere: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export interface IPatient extends Document{
    name: string;
    plan: string;
    dni: number;
    age: number;
    phoneNumber: number;
    email: string;
    imgUrl: string;
    entryDate: Date;
    departureDate: Date;
    birthDate: Date;
    birthPlace: string;
    ocupation: string;
    academicLevel: string;
    maritalStatus: string;
    residence: string;
    genere: string;
}

export default model<IPatient>('Patient', schema);