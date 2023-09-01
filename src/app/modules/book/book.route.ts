
import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { BookController } from "./book.controller";


const router = Router();


router.post('/create-book',
auth(ENUM_USER_ROLE.ADMIN),
BookController.insertBook);


router.get('/',
BookController.getAllBooks);

router.get('/:id',
BookController.getBookById);

router.get('/:categoryId/category',
BookController.getBookByCategory);

router.patch('/:id',
auth(ENUM_USER_ROLE.ADMIN),
BookController.updateBook);

router.delete('/:id',
auth(ENUM_USER_ROLE.ADMIN),
BookController.deleteBook);


export const BookControllerRoute = router;

