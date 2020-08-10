import {Router} from 'express';
import { createUser, loginUser, getUsers, getProfile } from '../controllers/user';
import { TokenValidation } from '../libs/verifyToken';

const router = Router();

router.route('/signup')
    .post(createUser);

router.route('/signin')
    .post(loginUser);

router.route('/users')
    .get(getUsers);

router.route('/profile')
    .get(TokenValidation, getProfile);

export default router;