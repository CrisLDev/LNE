import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    patient_id: {type: ObjectId, ref: 'Patient'},
    name:{
        type: String,
        required: true,
        min: 5
    },
    content:{
        type: String,
        required: true,
        min: 20
    }
},{
    timestamps: true
});

export interface ITracing extends Document{
    name: string,
    content: string,
}

export default model<ITracing>('Tracing', schema);