import {Request, Response} from 'express';

import Tracing, {ITracing} from '../models/Tracing';

export async function createTracing(req: Request, res: Response){
    const {name, content, patient_id} = req.body;

    const tracing: ITracing = new Tracing({
        name,
        content,
        patient_id
    });

    try {
        // Save tracing
        let tracingExist = await Tracing.findOne({name});

        if(tracingExist){
            return res.status(400)
            .json({errors: [{msg: "Tracing already exist"}]});
        }

        const savedTracing = await tracing.save();

        return res.status(200).json({msg: "Tracing successfully saved"});
    } catch (err) {
        res.status(400).send(err);
    }
}

export async function getTracingsByPatientId(req: Request, res: Response){

    try {

        const tracings = await Tracing.find({patient_id: req.params.id});

        if(tracings){
            return res.status(200).json(tracings);
        }

    } catch (err) {
        res.status(400).json({msg: "No data registered with this patient id."});
    }
}