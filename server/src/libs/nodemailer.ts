import { Request, Response } from "express";

import nodemailer from 'nodemailer';

export const nodeMailer = (req: Request, res: Response) => {

    const form = {
        /*: req.body.name,*/
        content: req.body.content,
        emailToSend: req.body.email,
        title: req.body.title
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crisrpdev@gmail.com',
            pass: '159753crisleo'
        }
    });

    const mailOptions = {
        from: "Centro de Reabilitación - La Nueva Era",
        to: form.emailToSend,
        subject: form.title,
        html: `
        <strong>Nombre:</strong> Centro de Reabilitación - La Nueva Era <br/>
        <strong>E-mail:</strong> ${form.emailToSend} <br/>
        <strong>Mensaje:</strong> ${form.content}
        `
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
        console.log(err)}
        else{
        /*console.log(info);*/
        return res.status(200).json({msg: "Respuesta enviada correctamente."});
    }
    });

}