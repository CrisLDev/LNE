import {Request, Response} from 'express';

import History, {IHistory} from '../models/History';

import {validationResult} from 'express-validator';

export async function createHistory(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    const {
        app_non_communicable_diseases,
        app_sexually_transmitted_diseases,
        app_degenerative_diseases,
        app_others,
        apnp_blood_type,
        apnp_adictions,
        apnp_allergies,
        apnp_antibiotics,
        apnp_current_conditions,
        apnp_has_been_hospitalized,
        ipeeo_respiratory,
        ipeeo_cardiovascular,
        ipeeo_genitourinary,
        ipeeo_endocrine,
        ipeeo_nervous,
        ipeeo_muscular,
        conclusions,
        patient_id
    } = req.body;

    const app_non_communicable_diseases_array = app_non_communicable_diseases.split(",");
    const app_sexually_transmitted_diseases_array = app_sexually_transmitted_diseases.split(",");
    const app_degenerative_diseases_array = app_degenerative_diseases.split(",");
    const app_others_array = app_others.split(",");
    const apnp_adictions_array = apnp_adictions.split(",");
    const apnp_allergies_array = apnp_allergies.split(",");
    const apnp_antibiotics_array = apnp_antibiotics.split(",");
    const apnp_current_conditions_array = apnp_current_conditions.split(",");
    const apnp_has_been_hospitalized_array = apnp_has_been_hospitalized.split(",");
    const ipeeo_respiratory_array = ipeeo_respiratory.split(",");
    const ipeeo_cardiovascular_array = ipeeo_cardiovascular.split(",");
    const ipeeo_genitourinary_array = ipeeo_genitourinary.split(",");
    const ipeeo_endocrine_array = ipeeo_endocrine.split(",");
    const ipeeo_nervous_array = ipeeo_nervous.split(",");
    const ipeeo_muscular_array = ipeeo_muscular.split(",");
    const conclusions_array = conclusions.split(",");

    const history = new History({
        app_non_communicable_diseases: app_non_communicable_diseases_array,
        app_sexually_transmitted_diseases: app_sexually_transmitted_diseases_array,
        app_degenerative_diseases: app_degenerative_diseases_array,
        app_others: app_others_array,
        apnp_blood_type,
        apnp_adictions: apnp_adictions_array,
        apnp_allergies: apnp_allergies_array,
        apnp_antibiotics: apnp_antibiotics_array,
        apnp_current_conditions: apnp_current_conditions_array,
        apnp_has_been_hospitalized: apnp_has_been_hospitalized_array,
        ipeeo_respiratory: ipeeo_respiratory_array,
        ipeeo_cardiovascular: ipeeo_cardiovascular_array,
        ipeeo_genitourinary: ipeeo_genitourinary_array,
        ipeeo_endocrine: ipeeo_endocrine_array,
        ipeeo_nervous: ipeeo_nervous_array,
        ipeeo_muscular: ipeeo_muscular_array,
        conclusions: conclusions_array,
        patient_id,
        user_id: req.userId
    });

    try{

        const savedHistory = await history.save();

        return res.status(200).json({msg: "Historia médica guardada correctamente."})
    }catch(err){
        res.status(400).send(err);
    }

}

export async function getHistoryByPatientId(req: Request, res: Response){
    try{
        const histories = await History.find({patient_id: req.params.patient_id});

        if(histories){
            return res.status(200).json({histories});
        }
    }catch (err){
        res.status(400).json({msg: "No hay datos para mostrar."})
    }
}

/*

export async function getHistories(req: Request, res: Response){
    try {
        const patients = await Patient.find();

        if(patients){
            return res.status(200).json(patients);
        }

    } catch (err) {
        res.status(400).send(err);
    }
}

export async function editPatientById(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    try{
        const {name, age, email, imgUrl, phoneNumber, entryDate, birthDate,
            birthPlace,
            ocupation,
            academicLevel,
            maritalStatus,
            residence,
            genere} = req.body;
        const editPatient = {
            name, 
            age, 
            email, 
            imgUrl, 
            phoneNumber, 
            entryDate,
            birthDate,
            birthPlace,
            ocupation,
            academicLevel,
            maritalStatus,
            residence,
            genere
        }

        const genereToEvaluate = genere;

        if(genereToEvaluate === 'hombre' || genereToEvaluate === 'mujer' || genereToEvaluate === 'helicoptero'){
            const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, editPatient, {new: true});
            return res.status(200).json(updatedPatient);
        }else{
            return res.status(400).json({errors: [{msg : "Porfavor escoge un género de la lista."}]});
        }

    }catch{
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
}

export async function deletePatientById(req: Request, res: Response){
    try{
        const deletedPatient = await Patient.findByIdAndRemove(req.params.id);
        const deletedTracings = await Tracing.find({patient_id: req.params.id}).remove();
        return res.status(200).json({deletedPatient, deletedTracings});
    } catch(err){
        return res.status(400).json({errors:[{mgs:"No hay datos para mostrar."}]});
    }
}
*/