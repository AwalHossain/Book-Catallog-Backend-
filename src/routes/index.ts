
import express from 'express';
import { BookControllerRoute } from '../app/modules/book/book.route';
import { CategoryControllerRoute } from '../app/modules/category/category.route';
import { OrderControllerRoute } from '../app/modules/order/order.route';
import { UserControllerRoute } from '../app/modules/user/user.route';

const router = express.Router();


const moduleRoutes = [
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
    }

]


moduleRoutes.forEach(route =>  router.use(route.path, route.route));


export default router;


