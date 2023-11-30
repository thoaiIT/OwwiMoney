import type { CategoryCreateType, CategoryUpdateType } from '@/actions/controller/categoryController';
import client from '@/helper/lib/prismadb';

class CategoryRepository {
  async createCategory({ name, description, typeId, userId }: CategoryCreateType & { userId: string }) {
    return await client.category.create({
      data: { name, description, typeId, userId, deleted: false },
    });
  }

  async getAllCategoryByUser(userId: string) {
    return await client.category.findMany({ where: { userId, deleted: false } });
  }

  async getCategoryByType(typeId: string, userId: string) {
    return await client.category.findMany({ where: { typeId, userId, deleted: false } });
  }

  async getCategoryByName(userId: string, name: string) {
    return await client.category.findMany({ where: { userId, name, deleted: false } });
  }

  async getCategoryById(categoryId: string, userId: string) {
    return client.category.findFirst({ where: { id: categoryId, userId, deleted: false } });
  }

  async updateCategory({ categoryId, name, description, typeId }: CategoryUpdateType) {
    return await client.category.update({
      where: { id: categoryId },
      data: { name, description, typeId, deleted: false },
    });
  }

  async deleteCategory(categoryId: string) {
    return await client.category.update({
      where: { id: categoryId },
      data: { deleted: true },
    });
  }
}

export default CategoryRepository;
