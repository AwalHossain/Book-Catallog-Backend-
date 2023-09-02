import { Order, Prisma, PrismaClient } from "@prisma/client";




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


export const OrderService = {
    createOrder
}