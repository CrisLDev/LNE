import {Request, Response} from 'express';

import User, {IUser} from '../models/User';

import jwt from 'jsonwebtoken';

export async function createUser(req: Request, res: Response){

    console.log(req.body)

    /*
    const {username, email, password} = req.body;

    const user: IUser = new User({
        username,
        email,
        password
    });

    try{
        // Save User
        let userExist = await User.findOne({email});

        if(userExist){
            return res.status(400)
            .json({errors: [{msg : "El email ya existe."}]});
        }

        user.password = await user.encryptPassword(user.password);

        const savedUser = await user.save();

        // Generatig Token

        const token: string = jwt.sign({_id: user._id}, process.env.SECRET || 'parangaricutirimicuarosence');

        return res.status(200).header('authorization', token).json({auth: true, token});

    } catch (err){
        res.status(400).send(err);
    }
    */

}

export async function loginUser(req: Request, res: Response){
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(401).json({errors: [{msg : "El email no existe."}]});

    const correctPassword: boolean = await user.validatePassword(req.body.password);

    if(!correctPassword) return res.status(401).json({errors: [{msg : "La contraseña es incorrecta."}]});

    const token = jwt.sign({_id: user._id},process.env.SECRET || 'parangaricutirimicuarosence',{
        expiresIn: 60 * 60 * 24
    });

    return res.status(200).header('authorization', token).json({auth: true, token});
}

export async function getUsers(req: Request, res: Response){
    res.json([
        {
            _id: 1,
            name: 'task one',
            description: 'lorem ipsun',
            date: "202020"
        },
        {
            _id: 2,
            name: 'task two',
            description: 'lorem ipsun',
            date: "202020"
        },
        {
            _id: 3,
            name: 'task three',
            description: 'lorem ipsun',
            date: "202020"
        }
    ])
}

export async function getProfile(req:Request, res: Response){
    
    const user = await User.findById(req.userId);
    
    if(!user) return res.status(401).send("User not found");

    return res.json({user,
        message: 'hola'
    })
}