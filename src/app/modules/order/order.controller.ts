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


export const OrderController = {
    createOrder
}