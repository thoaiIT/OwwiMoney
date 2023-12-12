'use server';
import StatisticRepository from '@/actions/repositories/statisticRepository';
import StatisticService from '@/actions/services/statisticService';
import { HttpStatusCodes } from '@/helper/type';

const statisticRepository = new StatisticRepository();
const statisticService = new StatisticService(statisticRepository);

export const getStatisticWeeklyByType = async (type: string) => {
  try {
    return await statisticService.getStatisticWeeklyByType(type);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
