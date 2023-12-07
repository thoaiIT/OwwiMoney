'use server';
import { uploadToCloudinary } from '@/actions/controller/transactionController';
import CategoryRepository from '@/actions/repositories/categoryRepository';
import CategoryService from '@/actions/services/categoryService';
import { HttpStatusCodes } from '@/helper/type';
import type { Category } from '@prisma/client';

export type CategoryCreateType = Pick<Category, 'name' | 'description' | 'typeId' | 'categoryImage'>;
export type CategoryUpdateType = CategoryCreateType & { categoryId: string };

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

export const createCategory = async (data: CategoryCreateType) => {
  const url = await uploadToCloudinary(data.categoryImage || '');
  if (url) {
    try {
      const result = await categoryService.createCategory({ ...data, categoryImage: url });
      return result;
    } catch (error) {
      console.error(error);
      return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
    }
  } else {
    return { message: 'Failed to upload image to Cloudinary', status: HttpStatusCodes[500] };
  }
};

export const getAllCategoryByUser = async (pageSize: number, page: number) => {
  try {
    return await categoryService.getAllCategoryByUser(pageSize, page);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getCategoryByType = async (typeId: string) => {
  try {
    return await categoryService.getCategoryByType(typeId);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getCategoryByName = async (name: string) => {
  try {
    return await categoryService.getCategoryByName(name);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    return await categoryService.getCategoryById(categoryId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const updateCategory = async (data: CategoryUpdateType) => {
  try {
    return await categoryService.updateCategory(data);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    return await categoryService.deleteCategory(categoryId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
