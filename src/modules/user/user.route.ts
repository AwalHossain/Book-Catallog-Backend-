

import { Router } from 'express';
import { UserController } from './user.controller';
 

const router = Router();


router.post('/', UserController.insertUser);
router.post('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


export const UserControllerRoute = router;
