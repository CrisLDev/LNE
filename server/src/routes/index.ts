import {Router} from 'express';
import { createUser, loginUser, getUsers, getProfile} from '../controllers/user';
import { TokenValidation } from '../libs/verifyToken';
import { createPatient, getPatients, getPatientById, editPatientById, deletePatientById } from '../controllers/patients';
import { createTracing, getTracingsByPatientId, getTracingById, editTracingById, deleteTracingById } from '../controllers/tracing';

import {check} from 'express-validator';

const router = Router();

router.route('/signup')
    .post([check('username').isLength({min:4, max: 20}),
    check('email').isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('email2').isEmail().isLength({min: 8, max: 50}).matches(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    check('password').isLength({min:6, max: 20}),
    check('password2').isLength({min:6, max: 20})], createUser);

router.route('/signin')
    .post(loginUser);

router.route('/users')
    .get(getUsers);

router.route('/profile')
    .get(TokenValidation, getProfile);

router.route('/patient')
    .get(getPatients)
    .post(createPatient);

router.route('/patient/:id')
    .get(getPatientById)
    .put(editPatientById)
    .delete(deletePatientById);

router.route('/tracing')
    .post(createTracing);

router.route('/tracing/:tracing_id')
    .get(getTracingById)
    .put(editTracingById)
    .delete(deleteTracingById);
    
router.route('/tracings/:id')
    .get(getTracingsByPatientId);

export default router;