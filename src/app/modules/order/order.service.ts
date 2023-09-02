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



const getAllOrders = async (user:JwtPayload | null): Promise<Order[] | null> => {

    if(user?.role === 'admin') {
        const orders = await prisma.order.findMany();
        return orders;
    }else if (user?.role === 'user') {
       const orders = await prisma.order.findMany({
              where: {
                userId: user.userId
              }
            });
            return orders;
    }

    return null;

}


// const getOrderForUser = async (userId: string): Promise<Order[] | null> => {
//     console.log(userId,'checking userservid');
    
//     const orders = await prisma.order.findMany({
//         where: {
//           userId: userId
//         }
//     });

//     console.log(orders,'checking',userId);
    

//     return orders;
// }


export const OrderService = {
    createOrder,
    getAllOrders,
    // getOrderForUser
}