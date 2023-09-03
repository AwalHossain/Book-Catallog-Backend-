import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();



const getAllUsers = async (): Promise<User[] | null> => {

        const users = await prisma.user.findMany();
        return users;
}

const getUserById = async (id: string):Promise<User | null>  => {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user;
}


const updateUser = async (id: string, userDetails: Partial<User>):Promise<User | null> => {

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: userDetails
        })
        return user;
}


const deleteUser = async (id: string):Promise<User | null> => {
    
            const user = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return user;
}


export const UserService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}