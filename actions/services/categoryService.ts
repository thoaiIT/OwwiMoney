import type { CategoryCreateType, CategoryUpdateType } from '@/actions/controller/categoryController';
import type CategoryRepository from '@/actions/repositories/categoryRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes } from '../../helper/type';

class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(data: CategoryCreateType) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;
      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const category = await this.categoryRepository.createCategory({ ...data, userId });
      return { message: 'Category Created', data: { category }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getAllCategoryByUser(pageSize: number, page: number) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }

      const categories = await this.categoryRepository.getAllCategoryByUser(
        userId,
        pageSize || DEFAULT_PAGE_SIZE,
        page || 1,
      );
      return { message: 'Success', data: categories, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getCategoryByType(typeId: string) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const categories = await this.categoryRepository.getCategoryByType(typeId, userId);
      return { message: 'Success', data: { categories }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getCategoryByName(name: string) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }

      const category = await this.categoryRepository.getCategoryByName(userId, name);
      return { message: 'Success', data: { category }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getCategoryById(categoryId: string) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const category = await this.categoryRepository.getCategoryById(categoryId, userId);
    return { message: 'Success', data: { category }, status: HttpStatusCodes[200] };
  }

  async updateCategory(data: CategoryUpdateType) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const categoryExist = await this.categoryRepository.getCategoryById(data.categoryId, userId);
    if (!categoryExist) {
      return { message: 'Invalid Category or User', status: HttpStatusCodes[422] };
    }

    const category = await this.categoryRepository.updateCategory({ ...data });
    return { message: 'Success', data: { category }, status: HttpStatusCodes[200] };
  }

  async deleteCategory(categoryId: string) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const categoryExist = await this.categoryRepository.getCategoryById(categoryId, userId);
    if (!categoryExist) {
      return { message: 'Invalid Category or User', status: HttpStatusCodes[422] };
    }

    const category = await this.categoryRepository.deleteCategory(categoryId);
    return { message: 'Success', data: { category }, status: HttpStatusCodes[200] };
  }
}

export default CategoryService;
