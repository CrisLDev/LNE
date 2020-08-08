import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    email: String,
    password: String
},{
    timestamps: true
});

interface IUser extends Document{
    email: string,
    password: string
}

export default model<IUser>('User', schema);