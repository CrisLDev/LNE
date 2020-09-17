import {Router} from 'express';
import { createUser, loginUser, getUsers, getProfile} from '../controllers/user';
import { TokenValidation } from '../libs/verifyToken';
import { createPatient, getPatients, getPatientById, editPatientById, deletePatientById } from '../controllers/patients';
import { createTracing, getTracingsByPatientId, getTracingById, editTracingById, deleteTracingById } from '../controllers/tracing';

import {check} from 'express-validator';
import { createNewletter } from '../controllers/newletter';
import { createQuestion } from '../controllers/askus';

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

router.route('/profile')
    .get(TokenValidation, getProfile);

router.route('/patient')
    .get(getPatients)
    .post([ 
        check('name').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('age').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('imgUrl').isLength({min:10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('phoneNumber').isLength({min:9, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)],
        createPatient);

router.route('/patient/:id')
    .get(getPatientById)
    .put([ 
        check('name').isLength({min:4, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('age').isLength({min:1, max: 2}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('imgUrl').isLength({min:10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('phoneNumber').isLength({min:9, max: 10}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('email').not().isEmpty().isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)],editPatientById)
    .delete(deletePatientById);

router.route('/tracing')
    .post([ 
        check('name').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('content').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
        check('patient_id').isLength({min:10, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio')],
        createTracing);

router.route('/tracing/:tracing_id')
    .get(getTracingById)
    .put([check('name').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('content').isLength({min:4, max: 20}).not().isEmpty().withMessage('El campo no puede estar vacio'),
    check('patient_id').isLength({min:10, max: 40}).not().isEmpty().withMessage('El campo no puede estar vacio')],editTracingById)
    .delete(deleteTracingById);
    
router.route('/tracings/:id')
    .get(getTracingsByPatientId);

router.route('/newletter')
    .post(createNewletter);

router.route('/askus')
    .post(createQuestion);

export default router;