import {Request, Response} from 'express';

import Schedule, {ISchedule} from '../models/Schedule';

import {validationResult} from 'express-validator';

export async function createSchedule(req:Request, res: Response) {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    const {title, date, participants} = req.body;

    try {
        
        const scheduleExist = await Schedule.findOne({title});

        if(scheduleExist?.title === title && scheduleExist?.date == date){
            return res.status(400).json({errors: [{msg: "Ya existe un horario."}]})
        }

        const schedule = new Schedule({
            title,
            date,
            participants
        });

        const scheduleSaved = await schedule.save();

        return res.status(200).json(scheduleSaved);

    } catch (err) {
        
    }

}

export async function getSchedules(req: Request, res: Response){
    const schedules = await Schedule.find().populate('participants.user', ['_id', 'username']);

    return res.status(200).json({schedules});
}

export async function editScheduleById(req: Request, res: Response){

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }

    try {

        const {title, date, _id} = req.body;
        
        const scheduleExist = await Schedule.findOne({title});

        if(scheduleExist?.title === title && scheduleExist?.date === date){
            if(scheduleExist?._id != _id)return res.status(400).json({errors: {msg: "Ya existe esta tarea."}}); 
        }

        const scheduleEdit = {
            title,
            date
        };
        const updatedSchedule = await Schedule.findByIdAndUpdate(_id, scheduleEdit, {new: true});

        return res.status(200).json(updatedSchedule);
    } catch (err) {
        return res.status(400).json({msg: "A ocurrido un error."})
    }
}

export async function deleteScheduleById(req: Request, res: Response){

    try {

        const eliminatedSchedule = await Schedule.findByIdAndRemove(req.params.id);

        return res.status(200).json(eliminatedSchedule);
    } catch (err) {
        return res.status(400).json({msg: "A ocurrido un error."})
    }
}