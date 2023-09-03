import { User } from ".prisma/client";
import { PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";

const prisma = new PrismaClient();

const signup = async (userDetails:User) => {

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


export const AuthService = {
    signup,
    loginUser
}