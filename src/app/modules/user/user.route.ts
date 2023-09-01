

import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import { UserController } from './user.controller';
 

const router = Router();


router.post('/',
UserController.insertUser);
router.get('/', 
auth(ENUM_USER_ROLE.ADMIN),
UserController.getAllUsers);

router.get('/:id',
auth(ENUM_USER_ROLE.ADMIN),
UserController.getUserById);
router.patch('/:id',
auth(ENUM_USER_ROLE.ADMIN),
UserController.updateUser);
router.delete('/:id',
auth(ENUM_USER_ROLE.ADMIN),
UserController.deleteUser);


export const UserControllerRoute = router;
