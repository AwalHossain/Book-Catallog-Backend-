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

    const orders = await OrderService.getAllOrders();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders fetched successfully',
        data: orders
    })
})

const getOrderForUser = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const userId = user.userId;
    const orders = await OrderService.getOrderForUser(userId);

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
    getOrderForUser
}