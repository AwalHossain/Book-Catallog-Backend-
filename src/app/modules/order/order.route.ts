import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { OrderController } from "./order.controller";




const router = Router();


router.post('/create-order',
auth(ENUM_USER_ROLE.USER),
OrderController.createOrder);


export const OrderControllerRoute = router;
