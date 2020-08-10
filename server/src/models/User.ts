import {Schema, model, Document} from 'mongoose';

import bcrypt from 'bcryptjs';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

schema.methods.encryptPassword = async (password: string): Promise<string> =>{
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

schema.methods.validatePassword = async function (password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', schema);