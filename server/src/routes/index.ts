import {Router} from 'express';
import { createUser, loginUser, getUsers, getProfile } from '../controllers/user';
import { TokenValidation } from '../libs/verifyToken';
import { createPatient, getPatients, getPatientById, editPatientById, deletePatientById } from '../controllers/patients';
import { createTracing, getTracingsByPatientId, getTracingById, editTracingById, deleteTracingById } from '../controllers/tracing';

const router = Router();

router.route('/signup')
    .post(createUser);

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