import type { CategoryCreateType, CategoryUpdateType } from '@/actions/controller/categoryController';
import client from '@/helper/lib/prismadb';

class CategoryRepository {
  async createCategory({ name, description, typeId, userId, categoryImage }: CategoryCreateType & { userId: string }) {
    return await client.category.create({
      data: { name, description, typeId, userId, deleted: false, categoryImage },
    });
  }

  async getAllCategoryByUser(userId: string, pageSize: number, page: number) {
    const [categories, total] = await Promise.all([
      client.category.findMany({
        where: { userId, deleted: false },
        include: { type: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      client.category.count({
        where: { userId, deleted: false },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      categories: categories.map((category) => ({
        ...category,
        typeName: category.type.name,
      })),
      totalPages,
    };
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
