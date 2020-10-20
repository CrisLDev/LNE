import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    plan:{
        type: String,
        required: true,
        min: 4
    },
    email:{
        type: String,
        required: true,
        min: 6
    },
    last:{
        type: String,
        required: true,
        min: 6
    }
},{
    timestamps: true
});

export interface ITreatment extends Document{
    plan: string;
    email: string;
    name: string;
    last: string;
}

export default model<ITreatment>('Treatments', schema);