import type StatisticRepository from '@/actions/repositories/statisticRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes } from '../../helper/type';

class StatisticService {
  private statisticReposiroty: StatisticRepository;

  constructor(statisticReposiroty: StatisticRepository) {
    this.statisticReposiroty = statisticReposiroty;
  }

  async getStatisticWeeklyByType(typeName: string) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const today = new Date();
      const dateStart = new Date(today);
      const dateEnd = new Date(today);
      dateStart.setDate(today.getDate() - today.getDay() + 1);
      dateEnd.setDate(today.getDate() + (6 - today.getDay() + 1));

      const transactions = await this.statisticReposiroty.getTransactionByDateRangeAndType({
        userId,
        typeName,
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      });

      //   Handle ISO Date string, add one second for the new date to go to the current date, not previous date
      const endDateLoop = new Date(dateEnd);
      const currentDate = new Date(dateStart);
      const listDate = [];
      while (currentDate <= endDateLoop) {
        listDate.push(currentDate.toUTCString().slice(5, 11));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log({ listDate });

      return { message: 'Success', data: { transactions, dateRangeLabels: listDate }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default StatisticService;
