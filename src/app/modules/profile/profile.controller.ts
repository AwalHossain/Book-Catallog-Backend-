import { Request, Response } from 'express';
import ApiError from "../../../error/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from './profile.service';


const getUserProfileData = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const userProfileData = await ProfileService.getUserProfileData(user);
    if (!userProfileData) {
        throw new ApiError(404, 'User not found');
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User profile data fetched successfully',
        data: userProfileData
    });
});



export const ProfileController = {
    getUserProfileData
}