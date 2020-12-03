import {Request, Response} from 'express';

import AskUs, {IAskUs} from '../models/AskUs';

import {validationResult} from 'express-validator';

export async function createQuestion(req: Request, res: Response) {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }
    
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

export async function getQuestions(req:Request, res: Response) {
    const questions = await AskUs.find().populate('user_id').sort({createdAt: -1});

    return res.status(200).json(questions)
}

export async function deleteQuestionById(req:Request, res: Response) {
    const questionEliminated = await AskUs.findByIdAndRemove(req.params.id);

    return res.status(200).json({questionEliminated})
}