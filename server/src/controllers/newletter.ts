import {Request, Response} from 'express';

import {validationResult} from 'express-validator';

import Newletter, {INewletter} from '../models/Newletter';

export async function createNewletter(req: Request, res: Response) {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    const {email} = req.body;

    try {
        const emailExist = await Newletter.findOne({email});

        if(emailExist) return res.status(401).json({errors: [{msg : "El email ya existe."}]});

        const newletter: INewletter = new Newletter({
            email
        });

        const saved = await newletter.save();

        return res.status(200).json({msg: "Tu email se ha guardado correctamente."});

    } catch (err) {
        return res.status(400).json({msg: "A ocurrido un error con tu petición."})
    }

}