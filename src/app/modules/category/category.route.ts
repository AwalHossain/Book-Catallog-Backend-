import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category',auth(ENUM_USER_ROLE.ADMIN), CategoryController.insertCategory);
router.get('/',  CategoryController.getAllCategories);
router.get('/:id',  CategoryController.getCategoryById);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory);

export const CategoryControllerRoute = router;