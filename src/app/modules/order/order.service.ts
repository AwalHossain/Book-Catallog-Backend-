import { Order, Prisma, PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";




const prisma = new PrismaClient();

const createOrder = async (order: Order) => {
    const newOrder = await prisma.order.create({
        data: {
            ...order,
            orderedBooks: order.orderedBooks as Prisma.InputJsonValue
        }
    });
    return newOrder;
}



const getAllOrders = async (user: JwtPayload | null): Promise<Order[] | null> => {

    if (user?.role === 'admin') {
        const orders = await prisma.order.findMany();
        return orders;
    } else if (user?.role === 'customer') {
        const orders = await prisma.order.findMany({
            where: {
                userId: user.userId
            }
        });
        return orders;
    }

    return null;

}


const getOrderByOrderId = async (user: JwtPayload | null, orderId: string): Promise<Order | null | undefined> => {
    console.log(user?.role);

    if (user?.role === 'admin') {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        return order;
    } else if (user?.role === 'customer') {

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        if (!order || order.userId !== user.userId) {
            return null;
        }
        return order;
    }

    
    return undefined;
}


export const OrderService = {
    createOrder,
    getAllOrders,
    getOrderByOrderId
}