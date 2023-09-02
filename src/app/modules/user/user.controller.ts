import { Request, Response } from 'express';
import { JwtHelpers } from '../../../helpers/jwtHelpets';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";


const insertUser = catchAsync(async (req: Request, res: Response) => {
    console.log((req as any).user, 'checking');
    
    const user = await UserService.insertUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: user
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    
    const user = await UserService.loginUser(req.body);

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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    
        const users = await UserService.getAllUsers();
    
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Users fetched successfully',
            data: users
        })
    })


const getUserById = catchAsync(async (req: Request, res: Response) => {
        
            const user = await UserService.getUserById(req.params.id);
        
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'User fetched successfully',
                data: user
            })
        }
    )


const updateUser = catchAsync(async (req: Request, res: Response) => {
     
    const user = await UserService.updateUser(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: user
    })
})


const deleteUser = catchAsync(async (req: Request, res: Response) => {
        
            const user = await UserService.deleteUser(req.params.id);
        
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'User deleted successfully',
                data: user
            })
        }
    )


export const UserController = {
    insertUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}