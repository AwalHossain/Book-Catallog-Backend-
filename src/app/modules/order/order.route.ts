import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { OrderController } from "./order.controller";




const router = Router();


router.post('/create-order',
auth(ENUM_USER_ROLE.USER),
OrderController.createOrder);

router.get('/',
auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
OrderController.getAllOrders);

router.get('/:orderId',
auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
OrderController.getOrderByOrderId);


export const OrderControllerRoute = router;
