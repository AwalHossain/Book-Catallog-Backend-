import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const insertBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.insertBook(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Book created successfully',
    data: book,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filtersData = req.query;
  const options = {
    page: Number(filtersData.page),
    limit: Number(filtersData.limit),
    sortBy: filtersData.sortBy as string,
    sortOrder: filtersData.sortOrder as string,
  };
  const books = await BookService.getAllBooks(filtersData, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books fetched successfully',
    data: books,
  });
});


const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
    const filtersData = req.query;
    const options = {
        page: Number(filtersData.page),
        limit: Number(filtersData.limit),
        sortBy: filtersData.sortBy as string,
        sortOrder: filtersData.sortOrder as string,
      };
    const books = await BookService.getBookByCategory(req.params.categoryId, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Books fetched successfully',
        data: books,
    });
});



const getBookById = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.getBookById(req.params.id);

  

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.updateBook(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully',
    data: book,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book deleted successfully',
    data: book,
  });
});

export const BookController = {
  insertBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookByCategory
};