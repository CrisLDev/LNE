import {Request, Response} from 'express';

import User, {IUser} from '../models/User';

import Profile from '../models/Profile';

import AskUs from '../models/AskUs';

import Testimonial from '../models/Testimonials';

import jwt from 'jsonwebtoken';

import {validationResult} from 'express-validator';

import bcrypt from 'bcryptjs';
import { isValidObjectId } from 'mongoose';

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

        return res.status(200).header('authorization', token).json({auth: true, token, savedUser});

    } catch (err){
        res.status(400).send(err);
    }

}

export async function createStaffUser(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    const {username, email, email2, password, password2} = req.body;

    const user: IUser = new User({
        username,
        email,
        password,
        role: 'staff'
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

        return res.status(200).json({msg: [{msg: "Staff agregado correctamente."}]});

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
    const users = await User.find().sort({createdAt: -1});

    return res.status(200).json({users});
}

export async function getUser(req:Request, res: Response){
    
    const user = await User.findById(req.userId);
    
    if(!user) return res.status(401).send("User not found");

    return res.status(200).json({user});
}

export async function getUserById(req:Request, res: Response){

    if(!isValidObjectId(req.params.id))return res.status(401).json({erros: [{msg: "Usuario no existe."}]});
    
    const user = await User.findById(req.params.id);
    
    if(!user) return res.status(401).send("User not found");

    return res.status(200).json({user});
}

export async function editUserById(req:Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
    }

    const {username, email, email2, imgUrl, password, password2, role} = req.body;
    
    try {
        const userExist = await User.findById(req.params.id);
    
        if(!userExist) return res.status(401).send("User not found");

        if(req.body.email != req.body.email2){
            return res.status(400).json({errors: [{msg: "Los emails  no coinciden."}]})
        }

        if(userExist.email == email && userExist._id != req.params.id) return res.status(401).send("El email ya está en uso.");

        const userToEdit = ({
            username,
            email,
            role
        });

        if(password !== ''){
            if(req.body.password != req.body.password2){
                return res.status(400).json({errors: [{msg: "Las contraseñas no coinciden."}]})
            }
            const salt = await bcrypt.genSalt(10);

            const passwordHashed = await bcrypt.hash(password, salt);

            Object.assign(userToEdit, {password: passwordHashed});
        }

        if(imgUrl !== ''){
            Object.assign(userToEdit, {imgUrl: imgUrl});
        }

        const userEdited = await User.findByIdAndUpdate(req.params.id, userToEdit, {new: true});

        return res.status(200).json({userEdited});

    } catch (err) {
        return res.status(400).json({err});
    }
}

export async function deleteUserById(req:Request, res: Response){

    try{
        const userEliminated = await User.findByIdAndRemove(req.params.id);
        await Profile.find({user_id: req.params.id}).remove();
        await Testimonial.find({user_id: req.params.id}).remove();
        await AskUs.find({user_id: req.params.id}).remove();
        return res.status(200).json(userEliminated);
    } catch(err){
        return res.status(400).json({msg: "No hay datos para mostrar."});
    }

}