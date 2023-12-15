'use server';
import StatisticRepository from '@/actions/repositories/statisticRepository';
import StatisticService from '@/actions/services/statisticService';
import { HttpStatusCodes } from '@/helper/type';

const statisticRepository = new StatisticRepository();
const statisticService = new StatisticService(statisticRepository);

export const getStatisticWeekly = async () => {
  try {
    return await statisticService.getStatisticWeekly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getStatisticMonthly = async () => {
  try {
    return await statisticService.getStatisticMonthly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getStatisticYearly = async () => {
  try {
    return await statisticService.getStatisticYearly();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getAmountByMonth = async (type: string, month: string) => {
  try {
    return await statisticService.getAmountByMonth(type, month);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getNewTransactionByUser = async () => {
  try {
    return await statisticService.getNewTransactionByUser();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getTransactionByType = async (type: string) => {
  try {
    return await statisticService.getTransactionByType(type);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
