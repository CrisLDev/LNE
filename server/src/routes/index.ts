import {Router} from 'express';
import { createUser, loginUser, getUsers, getUser, getUserById, editUserById, deleteUserById} from '../controllers/user';
import { TokenValidation } from '../libs/verifyToken';
import { createPatient, getPatients, getPatientById, editPatientById, deletePatientById } from '../controllers/patients';
import { createTracing, getTracingsByPatientId, getTracingById, editTracingById, deleteTracingById, getTracings } from '../controllers/tracing';

import {check} from 'express-validator';
import { createNewletter } from '../controllers/newletter';
import { createQuestion, deleteQuestionById, getQuestions } from '../controllers/askus';
import { createProfile, deleteProfileById, editProfileById, getProfile, getProfileById } from '../controllers/profile';
import { createSchedule, deleteScheduleById, editScheduleById, getSchedules } from '../controllers/schedule';
import { createTestimonial, deleteTestimonialById, getTestimonial, getTestimonials } from '../controllers/testimonial';
import { createHistory, deleteHistoryById, editHistoryById, getHistoriesById, getHistoriesByPatientId } from '../controllers/history';
import { nodeMailer } from '../libs/nodemailer';
import { createTreatment, deleteTreatmentById, getTreatments } from '../controllers/treatment';

const router = Router();

router.route('/signup')
    .post([check('username').not().isEmpty().isLength({min:4, max: 20}),
    check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('email2').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('password').not().isEmpty().isLength({min:6, max: 20}),
    check('password2').not().isEmpty().isLength({min:6, max: 20})], createUser);

router.route('/signin')
    .post([ 
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
        check('password').not().isEmpty().isLength({min:6, max: 20})],loginUser);

router.route('/users')
    .get(getUsers);

router.route('/user')
    .get(TokenValidation, getUser);

router.route('/user/:id')
    .get(TokenValidation, getUserById)
    .put([check('username').not().isEmpty().isLength({min:4, max: 20}),
    check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('email2').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('password').isLength({max: 20}),
    check('password2').isLength({max: 20})], TokenValidation, editUserById)
    .delete(deleteUserById);
    
router.route('/profile')
    .post([check('cedula').not().isEmpty().isLength({min:9, max: 11}),
    check('age').not().isEmpty().isLength({min:1, max: 2}),
    check('area').not().isEmpty().isLength({min:4, max: 15}),
    check('phoneNumber').not().isEmpty().isLength({min:9, max: 11})], TokenValidation, createProfile)
    .get(TokenValidation, getProfile);

router.route('/profile/:id')
    .get(TokenValidation, getProfileById)
    .put([check('cedula').not().isEmpty().isLength({min:9, max: 11}),
    check('age').not().isEmpty().isLength({min:1, max: 2}),
    check('area').not().isEmpty().isLength({min:4, max: 15}),
    check('phoneNumber').not().isEmpty().isLength({min:9, max: 11})], editProfileById)
    .delete(deleteProfileById);

router.route('/patient')
    .get(getPatients)
    .post([ 
        check('name').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('dni').isLength({min:9, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('age').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('imgUrl').isLength({min:10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('phoneNumber').isLength({min:9, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
        check('entryDate').not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('birthDate').not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('birthPlace').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('ocupation').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('academicLevel').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('maritalStatus').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('residence').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('genere').isLength({min:4, max: 12}).not().isEmpty().withMessage('El campo no puede estar vacio')
    ],
        createPatient);

router.route('/patient/:id')
    .get(getPatientById)
    .put([ 
        check('name').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('dni').isLength({min:9, max: 11}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('age').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('imgUrl').isLength({min:10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('phoneNumber').isLength({min:9, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
        check('entryDate').not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('birthDate').not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('birthPlace').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('ocupation').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('academicLevel').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('maritalStatus').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('residence').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('genere').isLength({min:4, max: 12}).not().isEmpty().withMessage('El campo no puede estar vacio')],editPatientById)
    .delete(deletePatientById);

router.route('/tracing')
    .get(getTracings)
    .post([ 
        check('name').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('content').isLength({min:4, max: 255}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('patient_id').isLength({min:10, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio')],TokenValidation,
        createTracing);

router.route('/tracing/:tracing_id')
    .get(getTracingById)
    .put([check('name').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('content').isLength({min:4, max: 255}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('patient_id').isLength({min:10, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio')],TokenValidation,editTracingById)
    .delete(deleteTracingById);
    
router.route('/tracings/:id')
    .get(getTracingsByPatientId);

router.route('/newletter')
    .post([check('email').not().isEmpty().isEmail().isLength({min: 10, max: 40}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)],createNewletter);

router.route('/askus')
    .post([ 
        check('title').isLength({min:6, max: 60}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('content').isLength({min:6}).not().isEmpty().withMessage('El campo no puede estar vacio')],createQuestion)
    .get(getQuestions);

router.route('/askus/:id')
        .delete(deleteQuestionById)

router.route('/testimonial')
    .post([check('name').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('content').isLength({min:4}).not().isEmpty().withMessage('El campo no puede estar vacio')],createTestimonial)
    .get(getTestimonial);

router.route('/testimonials')
    .get(getTestimonials);

router.route('/testimonial/:id')
    .delete(deleteTestimonialById);

router.route('/schedule')
    .get(getSchedules)
    .post([ 
        check('title').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('date').not().isEmpty().withMessage('El campo no puede estar vacio')], createSchedule);

router.route('/schedule/:id')
    .put([ 
        check('title').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('date').not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('_id').not().isEmpty().withMessage('El campo no puede estar vacio')],editScheduleById)
    .delete(deleteScheduleById);

router.route('/history')
    .post([check('apnp_blood_type').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio')],createHistory);

router.route('/history/patient/:patient_id')
    .get(getHistoriesByPatientId);

router.route('/history/:history_id')
    .put([check('apnp_blood_type').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio')], editHistoryById)
    .delete(deleteHistoryById)
    .get(getHistoriesById); 

router.route('/sendemail/:id')
    .post([ 
        check('title').isLength({min:6, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('content').isLength({min:6, max: 255}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)], nodeMailer, deleteQuestionById);

router.route('/treatment')
    .post([ 
        check('name').isLength({min:6, max: 60}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('plan').isLength({min:4, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('last').isLength({min:6, max: 60}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)], createTreatment)
    .get(getTreatments);

router.route('/treatment/sendemail/:id')
    .post([check('title').isLength({min:6, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('content').isLength({min:6, max: 255}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)],nodeMailer, deleteTreatmentById);

router.route('/treatment/:id')
    .delete(deleteTreatmentById);

export default router;