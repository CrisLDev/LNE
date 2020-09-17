import {Request, Response} from 'express';

import AskUs, {IAskUs} from '../models/AskUs';

import {validationResult} from 'express-validator';

export async function createQuestion(req: Request, res: Response) {
    
    const {user_id, title, content} = req.body;

    try {
        
        const questionExist = await AskUs.findOne({title});

        if(questionExist) return res.status(401).json({errors: [{msg : "La pregunta ya existe."}]});

        const question: IAskUs = new AskUs({
            user_id,
            title,
            content
        });

        const questionSaved = await question.save();

        return res.status(200).json({msg: "Pregunta agregada correctamente."})

    } catch (err) {

        return res.status(401).json({err});
        
    }

}