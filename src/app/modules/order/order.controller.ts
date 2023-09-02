import { Request, Response } from 'express';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";


const createOrder = catchAsync(async (req: Request, res: Response) => {

    const user = (req as any).user;

    const data = req.body;
    data.userId = user.userId;
    const order = await OrderService.createOrder(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Order created successfully',
        data: order
    })
}
)


const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;



    const orders = await OrderService.getAllOrders(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders fetched successfully',
        data: orders
    })
})

const getOrderByOrderId = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const orderId = req.params.orderId;
    console.log(user, 'checking');
    
    const orders = await OrderService.getOrderByOrderId(user, orderId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders fetched successfully',
        data: orders
    })
})


export const OrderController = {
    createOrder,
    getAllOrders,
    getOrderByOrderId
}