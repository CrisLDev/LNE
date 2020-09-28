import {Request, Response} from 'express';

import Profile, {IProfile} from '../models/Profile';

import {validationResult} from 'express-validator';

export async function createProfile(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
    }

    const {user_id, age, cedula, phoneNumber, area} = req.body;

    try {
        
        const profileExist = await Profile.findOne({cedula});        

        if(profileExist){
            return res.status(400).json({errors : [{msg: "Ya existe un perfil con este número de cedula."}]})
        }

        const profile: IProfile = new Profile({
            user_id,
            cedula,
            age,
            phoneNumber,
            area
        });

        const profileSaved: IProfile = await profile.save();

        return res.status(200).json({msg: "Hemos creado tu perfil correctamente.", profileSaved});

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

export async function editProfileById(req:Request, res: Response){

    const {cedula, area, age, phoneNumber} = req.body;

    try {
        const profileExist = await Profile.findOne({user_id: req.params.id});

        if(!profileExist){
            return res.status(401).json({errors: [{msg: "No tienes un perfil."}]})
        }

        if(profileExist.cedula == cedula && profileExist.user_id != req.params.id) return res.status(401).send("La cedula ya está en uso.");

        const profileToEdit = ({
            cedula,
            area,
            age,
            phoneNumber
        });

        const profileEdited = await Profile.findOneAndUpdate({user_id: req.params.id}, profileToEdit, {new:true});

        return res.status(200).json({profileEdited});

    } catch (err) {
        
    }

}

export async function deleteProfileById(req:Request, res: Response){

    try{
        const profileEliminated = await Profile.findOneAndRemove({user_id: req.params.id});
        return res.status(200).json(profileEliminated);
    } catch(err){
        return res.status(400).json({msg: "No hay datos para mostrar."});
    }

}