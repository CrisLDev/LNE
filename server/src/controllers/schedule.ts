import {Request, Response} from 'express';

import Schedule, {ISchedule} from '../models/Schedule';

export async function createSchedule(req:Request, res: Response) {

    const {title, date} = req.body;

    try {
        
        const scheduleExist = await Schedule.findOne({title});

        if(scheduleExist){
            return res.status(400).json({errors: {msg: "Ya existe un horario."}})
        }

        const schedule = new Schedule({
            title,
            date
        });

        const scheduleSaved = await schedule.save();

        return res.status(200).json(scheduleSaved);

    } catch (err) {
        
    }

}