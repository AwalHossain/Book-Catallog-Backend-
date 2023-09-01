import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertCategory = async (categoryDetails: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data: categoryDetails,
  });
  return category;
};

const getAllCategories = async (): Promise<Category[] | null> => {
  const categories = await prisma.category.findMany();
  return categories;
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
        books: true
    }
  });
  return category;
};

const updateCategory = async (id: string, categoryDetails: Partial<Category>): Promise<Category | null> => {
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: categoryDetails,
    include: {
        books: true
    }
  });
  return category;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return category;
};

export const CategoryService = {
  insertCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};