import type { CategoryCreateType, CategoryUpdateType } from '@/actions/controller/categoryController';
import client from '@/helper/lib/prismadb';

class CategoryRepository {
  async createCategory({ name, description, typeId, userId, categoryImage }: CategoryCreateType & { userId: string }) {
    return await client.category.create({
      data: { name, description, typeId, userId, deleted: false, categoryImage },
    });
  }

  async getAllCategoryByUser(userId: string, pageSize: number, page: number, query?: string) {
    type FilterInside = { mode?: 'insensitive' | 'sensitive'; contains?: string };

    const queryFilter: Array<Record<string, FilterInside | Record<string, FilterInside>>> = [
      {
        name: {
          mode: 'insensitive',
          contains: query || '',
        },
      },
      {
        type: {
          name: {
            mode: 'insensitive',
            contains: query || '',
          },
        },
      },
    ];

    const [categories, total] = await Promise.all([
      client.category.findMany({
        where: { userId, deleted: false, OR: queryFilter },
        include: { type: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      client.category.count({
        where: { userId, deleted: false, OR: queryFilter },
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
    return await client.category.findFirst({
      where: { id: categoryId, userId, deleted: false },
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateCategory({ categoryId, name, description, typeId, categoryImage }: CategoryUpdateType) {
    return await client.category.update({
      where: { id: categoryId },
      data: { name, description, typeId, deleted: false, categoryImage },
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
