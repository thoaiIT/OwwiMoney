import type { UserBudgetCreateType, UserBudgetUpdateType } from '@/actions/controller/userBudgetController';
import client from '@/helper/lib/prismadb';

class UserBudgetRepository {
  async createUserBudget({ categoryId, expected, actual, status, userId }: UserBudgetCreateType & { userId: string }) {
    return await client.userBudget.create({
      data: { categoryId, expected, actual, status, userId },
    });
  }

  async getListUserBudgetByUserId(userId: string) {
    return client.userBudget.findMany({ where: { userId } });
  }

  async getDetailCategoryUserBudget(userBudgetId: string) {
    return client.userBudget.findFirst({ where: { id: userBudgetId }, include: { user: true } });
  }

  async updateUserBudget({ userBudgetId, categoryId, expected, actual, status }: UserBudgetUpdateType) {
    return await client.userBudget.update({
      where: { id: userBudgetId },
      data: { categoryId, expected, actual, status },
    });
  }

  async updateMultipleUserBudgets(dataList: UserBudgetUpdateType[], userId: string) {
    const updateDataList = dataList.map((data) => ({
      where: {
        id: data.userBudgetId,
        categoryId: data.categoryId,
        userId: userId,
      },
      data: {
        expected: data.expected,
        actual: data.actual,
        status: data.status,
      },
    }));
    return await client.userBudget.updateMany({ data: updateDataList });
  }

  async getUserBudgetByTypeName(userId: string, typeName: string) {
    const userBudget = await client.userBudget.findMany({
      where: {
        userId: userId,
        category: {
          type: {
            name: typeName,
          },
        },
      },
      include: {
        category: {
          include: {
            type: true, // Includes information about the Category's Type
          },
        },
      },
    });

    return userBudget;
  }

  async getInfoSendMail(userBudgetId: string) {
    const userBudgets = await client.userBudget.findUnique({
      where: {
        id: userBudgetId,
      },
      include: {
        category: {
          select: {
            name: true,
            type: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    return userBudgets;
  }
}

export default UserBudgetRepository;
