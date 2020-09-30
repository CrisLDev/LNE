import {Request, Response} from 'express';

import Tracing, {ITracing} from '../models/Tracing';

import {validationResult} from 'express-validator';

export async function createTracing(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: {msg : "Los datos contienen una estructura incorrecta."}});
        }

    const {name, content, patient_id} = req.body;

    const tracing: ITracing = new Tracing({
        name,
        content,
        patient_id,
        user_id: req.userId
    });

    try {
        // Save tracing
        let tracingExist = await Tracing.findOne({name});

        if(tracingExist){
            return res.status(400)
            .json({errors: [{msg: "El nombre del seguimiento ya existe."}]});
        }

        const savedTracing = await tracing.save();

        return res.status(200).json({msg: "Seguimiento guardado correctamente."});
    } catch (err) {
        res.status(400).send(err);
    }
}

export async function getTracingsByPatientId(req: Request, res: Response){

    try {

        const tracings = await Tracing.find({patient_id: req.params.id}).populate('user_id', 'username');

        if(tracings){
            return res.status(200).json(tracings);
        }else{
            return res.status(400).json({errors: [{msg: "No hay seguimientos relacionados con este paciente."}]});
        }

    } catch (err) {
        res.status(400).json({msg: "No hay datos para mostrar."});
    }
}

export async function getTracingById(req: Request, res: Response){

    try {

        const tracing = await Tracing.findOne({_id: req.params.tracing_id});

        if(tracing){
            return res.status(200).json(tracing);
        }else{
            return res.status(400).json({errors: [{msg: "No hay seguimientos relacionados con este paciente."}]});
        }

    } catch (err) {
        res.status(400).json({msg: "No hay datos para mostrar."});
    }
}

export async function editTracingById(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    try {

        // Save tracing
        let tracingExist = await Tracing.findOne({name: req.body.name});

        if(tracingExist){
            if(tracingExist?._id != req.params.tracing_id){
                return res.status(400)
                .json({errors: [{msg: "El nombre del seguimiento ya existe."}]});
            }
        }

        const {name, content, patient_id} = req.body;

        const tracingToEdit = {
            name,
            content,
            patient_id,
            user_id: req.userId
        }

        const tracingUpdated = await Tracing.findByIdAndUpdate(req.params.tracing_id, tracingToEdit, {new: true});

        if(tracingToEdit){
            return res.status(200).json(tracingUpdated);
        }else{
            return res.status(400).json({errors: [{msg: "No hay seguimientos relacionados con este paciente."}]});
        }

    } catch (err) {
        res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]});
    }

}

export async function deleteTracingById(req: Request, res: Response){
    try{
        const deletedTracing = await Tracing.findByIdAndRemove(req.params.tracing_id);
        return res.status(200).json(deletedTracing);
    } catch(err){
        return res.status(400).json({msg: "No hay datos para mostrar."});
    }
}