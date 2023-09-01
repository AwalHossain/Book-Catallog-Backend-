import { Request, Response } from 'express';
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";


const insertUser = catchAsync(async (req: Request, res: Response) => {

    const user = await UserService.insertUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: user
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
    deleteUser
}