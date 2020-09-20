import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    user_id: {type: ObjectId, ref: 'User'},
    cedula:{
        type: Number,
        required: true,
        min: 6
    },
    age:{
        type: Number,
        required: true,
        min: 1
    },
    phoneNumber:{
        type: Number,
        required: true,
        min: 9
    },
    area:{
        type: String,
        required: true,
        min: 4
    }
},{
    timestamps: true
});

export interface IProfile extends Document{
    user_id?: any;
    cedula: number;
    age: number;
    phoneNumber: number;
    area: string;
}

export default model<IProfile>('Profile', schema);