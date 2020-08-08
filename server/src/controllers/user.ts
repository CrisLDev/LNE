import {Request, Response} from 'express';

import User from '../models/User';

import jwt from 'jsonwebtoken';

export async function createUser(req: Request, res: Response): Promise<Response>{
    const {email, password} = req.body;

    const newUser = new User({
        email,
        password
    });

    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'parangaricutirimicuarosence');

    return res.status(200).json({token});
}