
import express from 'express';
import { AuthControllerRoute } from '../app/modules/auth/auth.route';
import { BookControllerRoute } from '../app/modules/book/book.route';
import { CategoryControllerRoute } from '../app/modules/category/category.route';
import { OrderControllerRoute } from '../app/modules/order/order.route';
import { ProfileControllerRoute } from '../app/modules/profile/profile.route';
import { UserControllerRoute } from '../app/modules/user/user.route';

const router = express.Router();


const moduleRoutes = [
    {
        path: '/auth',
        route: AuthControllerRoute
    },
    {
        path: '/users',
        route: UserControllerRoute
    },
    {
        path: '/categories',
        route: CategoryControllerRoute
    },
    {
        path: '/books',
        route: BookControllerRoute
    },
    {
        path: '/orders',
        route: OrderControllerRoute
    },
    {
        path: '/profile',
        route: ProfileControllerRoute
    }

]


moduleRoutes.forEach(route =>  router.use(route.path, route.route));


export default router;


