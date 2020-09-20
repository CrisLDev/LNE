import {Request, Response} from 'express';

import Task, {ITask} from '../models/Task';

export async function createTask(req: Request, res: Response){
    const {user_id, title, date} = req.body;

    try {
        const taskExist = await Task.findOne({title});

        const dateTime: number = new Date().getDay();

        const dateSchedule = taskExist?.date.getDay();

        if(taskExist?.title === title && dateSchedule?.toString === dateTime.toString){
            return res.status(401).json({errors: {msg: "El horario ya existe"}});
        }

        const task:ITask = new Task({
            user_id,
            title,
            date
        });

        const taskCreated: ITask = await task.save();

        return res.status(200).json({msg: "Tarea creado correctamente."})

    } catch (err) {
        return res.status(400).json({erros: {msg: "Ha ocurrido un error inesperado."}})
    }

}