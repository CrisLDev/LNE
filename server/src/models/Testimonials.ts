import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    user_id: {type: ObjectId, ref: 'User'},
},{
    timestamps: true
});

export interface ITestimonials extends Document{
    name: string;
    content: string;
}

export default model<ITestimonials>('Testimonial', schema);