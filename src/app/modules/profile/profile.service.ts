import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../error/ApiError";

const prisma = new PrismaClient();

const getUserProfileData = async (user: JwtPayload | null): Promise<User | null> => {
    
    if (!user) {
        
        throw new ApiError(401, 'Unauthorized');
    }
    const userProfileData = await prisma.user.findUnique({
        where: {
            id: user?.userId
        },
        include: {
            Order: true,
            reviewAndRatings: true
        }
    });
    return userProfileData;
};


export const ProfileService = {
    getUserProfileData
}