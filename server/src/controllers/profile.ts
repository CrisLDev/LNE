import {Request, Response} from 'express';

import Profile, {IProfile} from '../models/Profile';

export async function createProfile(req: Request, res: Response){

    const {user_id, age, cedula, phoneNumber, area} = req.body;

    try {
        
        const profileExist = await Profile.findOne({cedula});        

        if(profileExist){
            return res.status(400).json({errors : {msg: "Ya tienes un perfil."}})
        }

        const profile: IProfile = new Profile({
            user_id,
            cedula,
            age,
            phoneNumber,
            area
        });

        const profileSaved: IProfile = await profile.save();

        return res.status(200).json({msg: "Hemos creado tu perfil correctamente."})

    } catch (err) {
        
        return res.status(400).json(err);

    }

}

export async function getProfile(req:Request, res: Response){

    const profileExist = await Profile.findOne({user_id: req.userId});

    if(!profileExist){
        return res.status(401).json({errors: {mag: "No tienes un perfil."}})
    }

    return res.status(200).json({profileExist});

}

export async function getProfileById(req:Request, res: Response){

    const profileExist = await Profile.findOne({user_id: req.params.id});

    if(!profileExist){
        return res.status(401).json({errors: {mag: "No tienes un perfil."}})
    }

    return res.status(200).json({profileExist});

}