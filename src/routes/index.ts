
import express from 'express';
import { UserControllerRoute } from '../app/modules/user/user.route';

const router = express.Router();


const moduleRoutes = [
    {
        path: '/users',
        route: UserControllerRoute
    },

]


moduleRoutes.forEach(route =>  router.use(route.path, route.route));


export default router;


