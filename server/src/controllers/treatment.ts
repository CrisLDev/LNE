import {Request, Response} from 'express';

import Treatment, {ITreatment} from '../models/Treatment';

import {validationResult} from 'express-validator';

export async function createTreatment(req: Request, res: Response) {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }
    
    const {email, name, last, plan} = req.body;

    try {
        
        const planExist = await Treatment.findOne({email});

        if(planExist) return res.status(401).json({errors: [{msg : "Ya existe un plan asociado a este email."}]});

        const treatment: ITreatment = new Treatment({
            email, 
            name, 
            last, 
            plan
        });

        const treatmentSaved = await treatment.save();

        return res.status(200).json({msg: "Petición agregada correctamente."})

    } catch (err) {

        return res.status(401).json({err});
        
    }

}

export async function getTreatments(req:Request, res: Response) {
    const treatments = await Treatment.find().sort({createdAt: -1});

    return res.status(200).json(treatments)
}

export async function deleteTreatmentById(req:Request, res: Response) {

    const treatmentEliminated = await Treatment.findByIdAndRemove(req.params.id);

    return res.status(200).json({treatmentEliminated})
}