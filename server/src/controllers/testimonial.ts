import {Request, Response} from 'express';

import Testimonial, {ITestimonials} from '../models/Testimonials';

import {validationResult} from 'express-validator';

export async function createTestimonial(req: Request, res: Response) {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg : "Los datos contienen una estructura incorrecta."}]});
        }
    
    const {user_id, name, content} = req.body;

    try {

        const testimonial: ITestimonials = new Testimonial({
            user_id,
            name,
            content
        });

        const testimonialSaved = await testimonial.save();

        return res.status(200).json({msg: "Testimonial agregado correctamente."})

    } catch (err) {

        return res.status(401).json({err});
        
    }

}

export async function getTestimonial(req:Request, res: Response) {
    const testimonial = await Testimonial.find().populate('user_id').limit(2);
    
    return res.status(200).json({testimonial})
}

export async function getTestimonials(req:Request, res: Response) {
    const testimonials = await Testimonial.find().populate('user_id').sort({createdAt: -1});

    return res.status(200).json(testimonials)
}

export async function deleteTestimonialById(req:Request, res: Response) {
    const testimonialEliminated = await Testimonial.findByIdAndRemove(req.params.id);

    return res.status(200).json({testimonialEliminated})
}