
import { Router } from 'express';
import { AuthController } from './auth.controller';
 

const router = Router();


router.post('/signup',
AuthController.signup);

router.get('/signin',
AuthController.loginUser);


export const AuthControllerRoute = router;