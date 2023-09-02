import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { ProfileController } from "./profile.controller";


const router = Router();


router.get('/', 
auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
ProfileController.getUserProfileData
);



export const ProfileControllerRoute = router;