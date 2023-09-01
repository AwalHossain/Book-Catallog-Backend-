import { Book, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



type IgenericResponse<T> = {
    data: T,
    meta: {
        page: number,
        size: number,
        total: number
        totalPage?: number
    }
}

type PaginationOptions = {
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string
}


const insertBook = async (bookDetails: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: bookDetails,
    include: {
        category: true,
        reviewAndRatings: true
    }
  });
  return book;
};



const getAllBooks = async (
    filtersData: any,
    options: PaginationOptions
): Promise<IgenericResponse<Book[]>| null> => {

    const { page: rawPage = 1, limit: rawLimit = 10, sortBy = 'createdAt', sortOrder = 'desc' }= options;
    const {searchTerm, ...filtersOptions} = filtersData;

  // Ensure that page and limit are valid numbers
  const page = Number(rawPage) || 1;
  const limit = Number(rawLimit) || 10;


    const AndConditions = [];

    const searchFields = ['title', 'author', 'genre'];
    const filterFields = ['minPrice', 'maxPrice', 'category'];
    if(searchTerm) {
        AndConditions.push({
            OR: searchFields.map((fields) =>{
                return {
                    [fields]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                }
            }
            })

        })
    }

    // here we are filtering the books based on the filters options with exaxt match
    // if(Object.keys(filtersOptions).length) {
    //     AndConditions.push({
    //         AND: filterFields.map((field) => {
    //             return {
    //                 [field]: filtersOptions[field]
    //             }
    //         })
    //     })
    // }

    const {minPrice, maxPrice, categoryId} = filtersOptions;

    if(minPrice || maxPrice) {
        AndConditions.push({
            price: {
                gte: Number(minPrice) || 0,
                lte: Number(maxPrice) || 100000
            }
        })
    }

    if(categoryId) {
        AndConditions.push({
            categoryId: categoryId
        })
    }




    const where = AndConditions.length ? {
        AND: AndConditions
    } : {};

    
    const skip = (page -1)* limit;
    const take = limit;
    console.log(skip,take,'checking');
    const orderBy = {
        [sortBy]: sortOrder as 'asc' | 'desc' | undefined
    }

  const books = await prisma.book.findMany({
            where,
            skip,
            take,
            orderBy
});

  // count the total number of books
    const total = await prisma.book.count({
        where
    });


    const totalPage = Math.ceil(total/limit);

  return {
        data: books,
        meta:{
            page,
            size: limit,
            total,
            totalPage
        }
  };
};


const getBookByCategory = async (category: string, options: PaginationOptions): Promise<IgenericResponse< Book[]> | null> => {
    const { page = 1, limit=10 } = options;
    const skip = (page -1)* limit;
    const take = limit;
    
    const books = await prisma.book.findMany({
        where: {
           categoryId: category
        },
        skip,
        take,
        include: {
            category: true
        }
    });

    

    const total = await prisma.book.count({
        where: {
            categoryId: category
        }
    });

    const totalPage = Math.ceil(total/10);

    return {
        data: books,
        meta:{
            page,
            size: limit,
            total,
            totalPage
        }

    };
}


const getBookById = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  return book;
};

const updateBook = async (id: string, bookDetails: Partial<Book>): Promise<Book | null> => {
  const book = await prisma.book.update({
    where: {
      id: id,
    },
    data: bookDetails,
  });
  return book;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return book;
};

export const BookService = {
  insertBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookByCategory
};