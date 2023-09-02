import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { OrderController } from "./order.controller";




const router = Router();


router.post('/create-order',
auth(ENUM_USER_ROLE.USER),
OrderController.createOrder);

router.get('/',
auth(ENUM_USER_ROLE.ADMIN),
OrderController.getAllOrders);

router.get('/userOrder',
auth(ENUM_USER_ROLE.USER),
OrderController.getOrderForUser);

export const OrderControllerRoute = router;
