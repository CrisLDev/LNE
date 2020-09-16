import {Request, Response} from 'express';

import User, {IUser} from '../models/User';

import jwt from 'jsonwebtoken';

import {validationResult} from 'express-validator';

export async function createUser(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    const {username, email, email2, password, password2} = req.body;

    const user: IUser = new User({
        username,
        email,
        password
    });

    try{

        if(req.body.email != req.body.email2 || req.body.password != req.body.password2){
            return res.status(400).json({errors: [{msg: "Los emails o las contraseñas no coinciden."}]})
        }

        // Save User
        let userExist = await User.findOne({email});

        if(userExist){
            return res.status(400)
            .json({errors: [{msg : "El email ya existe."}]});
        }

        user.password = await user.encryptPassword(user.password);

        const savedUser = await user.save();

        // Generatig Token

        if(req.body.rememberme){
            var token: string = jwt.sign({_id: user._id}, process.env.SECRET || 'parangaricutirimicuarosence');
        }else{
            var token = jwt.sign({_id: user._id},process.env.SECRET || 'parangaricutirimicuarosence',{
                expiresIn: 60 * 60 * 24
            });
        }

        return res.status(200).header('authorization', token).json({auth: true, token});

    } catch (err){
        res.status(400).send(err);
    }

}

export async function loginUser(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(401).json({errors: [{msg : "El email no existe."}]});

    const correctPassword: boolean = await user.validatePassword(req.body.password);

    if(!correctPassword) return res.status(401).json({errors: [{msg : "La contraseña es incorrecta."}]});

    if(req.body.rememberme){
        var token = jwt.sign({_id: user._id},process.env.SECRET || 'parangaricutirimicuarosence');
    }else{
        var token = jwt.sign({_id: user._id},process.env.SECRET || 'parangaricutirimicuarosence',{
            expiresIn: 60 * 60 * 24
        });
    }

    return res.status(200).header('authorization', token).json({auth: true, token, user});
}

export async function getUsers(req: Request, res: Response){
    const users = await User.find();

    return res.status(200).json({users});
}

export async function getProfile(req:Request, res: Response){
    
    const user = await User.findById(req.userId);
    
    if(!user) return res.status(401).send("User not found");

    return res.status(200).json({user});
}