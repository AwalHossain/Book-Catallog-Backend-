import { Request, Response } from 'express';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";


const insertCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryService.insertCategory(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Category created successfully',
        data: category
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Categories fetched successfully',
        data: categories
    })
})

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryService.getCategoryById(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category fetched successfully',
        data: category
    })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryService.updateCategory(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category updated successfully',
        data: category
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryService.deleteCategory(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category deleted successfully',
        data: category
    })
})

export const CategoryController = {
    insertCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}