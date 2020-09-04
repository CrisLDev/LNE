import {Request, Response} from 'express';

import Patient, {IPatient} from '../models/Patient';

import Tracing from '../models/Tracing';

export async function createPatient(req: Request, res: Response){
    const {name, age, imgUrl, email, phoneNumber, entryDate} = req.body;

    const patient: IPatient = new Patient({
        name,
        age,
        email,
        imgUrl,
        phoneNumber,
        entryDate
    });

    try{
        // Save patient
        let patientExist = await Patient.findOne({email});

        if(patientExist){
            return res.status(400)
            .json({errors: [{msg : "Email already exist"}]});
        }

        const savedPatient = await patient.save();

        return res.status(200).json({msg: "Successfully saved"})
    }catch(err){
        res.status(400).send(err);
    }

}

export async function getPatients(req: Request, res: Response){
    try {
        const patients = await Patient.find();

        if(patients){
            return res.status(200).json(patients);
        }

    } catch (err) {
        res.status(400).send(err);
    }
}

export async function getPatientById(req: Request, res: Response){
    try{
        const patient = await Patient.findById(req.params.id);

        if(patient){
            return res.status(200).json(patient);
        }
    }catch (err){
        res.status(400).json({msg: "Without Data to Show"})
    }
}

export async function editPatientById(req: Request, res: Response){
    try{
        const {name, age, email, imgUrl, phoneNumber, entryDate} = req.body;
        const editPatient = {
            name, 
            age, 
            email, 
            imgUrl, 
            phoneNumber, 
            entryDate
        }

        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, editPatient, {new: true})

        return res.status(200).json(updatedPatient);
    }catch{
        return res.status(400).json({msg: "No data to show"})
    }
}

export async function deletePatientById(req: Request, res: Response){
    try{
        const deletedPatient = await Patient.findByIdAndRemove(req.params.id);
        const deletedTracings = await Tracing.find({patient_id: req.params.id}).remove();
        return res.status(200).json({deletedPatient, deletedTracings});
    } catch(err){
        return res.status(400).json({mgs:"Data was no founded"});
    }
}