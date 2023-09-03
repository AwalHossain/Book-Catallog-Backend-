import { Request, Response } from 'express';
import { JwtHelpers } from "../../../helpers/jwtHelpets";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";


const signup = catchAsync(async (req: Request, res: Response) => {
    console.log((req as any).user, 'checking');
    
    const user = await AuthService.signup(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: user
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    
    const user = await AuthService.loginUser(req.body);

    const paylaod = {
        userId: user?.id,
        role: user?.role
    }

    let token =  JwtHelpers.createToken(
        paylaod,
        process.env.JWT_SECRET as string,
        '365d'
        )

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: token
    })
})



export const AuthController = {
    signup,
    loginUser
}