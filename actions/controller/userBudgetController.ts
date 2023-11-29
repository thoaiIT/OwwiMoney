'use server';
import UserBudgetRepository from '@/actions/repositories/userBudgetRepository';
import UserBudgetService from '@/actions/services/userBudgetService';
import { HttpStatusCodes } from '@/helper/type';
import type { UserBudget } from '@prisma/client';

export type UserBudgetCreateType = Pick<UserBudget, 'categoryId' | 'expected' | 'actual' | 'status'>;
export type UserBudgetUpdateType = UserBudgetCreateType & { userBudgetId: string };

const userBudgetRepository = new UserBudgetRepository();
const userBudgetService = new UserBudgetService(userBudgetRepository);

// Create User Budget
export const createUserBudget = async (data: UserBudgetCreateType) => {
  try {
    const result = await userBudgetService.createUserBudget(data);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

// Get list User Budget by UserId
export const getListUserBudgetByUserId = async () => {
  try {
    const result = await userBudgetService.getListUserBudgetByUserId();
    return result;
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

// Get detail User Budget
export const getDetailCategoryUserBudget = async (userBudgetId: string) => {
  try {
    const result = await userBudgetService.getDetailCategoryUserBudget(userBudgetId);
    return result;
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

// Update User Budget
export const updateUserBudget = async (data: UserBudgetUpdateType) => {
  try {
    return await userBudgetService.updateUserBudget(data);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

// Update multiple User Budgets
export const updateMultipleUserBudgets = async (dataList: UserBudgetUpdateType[]) => {
  try {
    return await userBudgetService.updateMultipleUserBudgets(dataList);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

// Get list User Budget by Type Name
export const getListUserBudgetByTypeName = async (typeName: string) => {
  try {
    const result = await userBudgetService.getListUserBudgetByTypeName(typeName);
    return result;
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

// Send mail warning when reach expected limit
export const sendMailWarning = async (userBudgetId: string) => {
  try {
    return await userBudgetService.sendMailWarning(userBudgetId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
