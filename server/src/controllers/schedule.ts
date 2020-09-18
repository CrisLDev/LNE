import {Request, Response} from 'express';

import Schedule, {ISchedule} from '../models/Schedule';

export async function createSchedule(req: Request, res: Response){
    const {user_id, title, date} = req.body;

    try {
        const scheduleExist = await Schedule.findOne({title});

        const dateTime: number = new Date().getDay();

        const dateSchedule = scheduleExist?.date.getDay();

        if(scheduleExist?.title === title && dateSchedule?.toString === dateTime.toString){
            return res.status(401).json({errors: {msg: "El horario ya existe"}});
        }

        const schedule:ISchedule = new Schedule({
            user_id,
            title,
            date
        });

        const scheduleCreated: ISchedule = await schedule.save();

        return res.status(200).json({msg: "Horario creado correctamente."})

    } catch (err) {
        return res.status(400).json({erros: {msg: "Ha ocurrido un error inesperado."}})
    }

}