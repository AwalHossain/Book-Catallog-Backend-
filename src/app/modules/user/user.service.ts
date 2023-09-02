import { PrismaClient, User } from '@prisma/client';
import ApiError from '../../../error/ApiError';

const prisma = new PrismaClient();

const insertUser = async (userDetails:User) => {

        const user = await prisma.user.create({
            data: userDetails
        })
        return user;

}

const loginUser = async (userDetails:Partial<User>) => {

        const user = await prisma.user.findUnique({
            where: {
                email: userDetails.email
            }

        })

        if(user?.password !== userDetails.password) {
            throw new ApiError(400,'Invalid password');
        }
        return user;
    }

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
    insertUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
}