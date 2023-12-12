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
      dateStart.setDate(today.getDate() - today.getDay() + 1 - 6); // The start of previous week
      dateEnd.setDate(today.getDate() + (7 - today.getDay() + 1)); // The end of current week

      const statisticOutcome = await this.statisticReposiroty.getTransactionByDateRangeAndType({
        userId,
        typeName: 'Outcome',
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      });

      //   Get List date of UTC Date
      const endDateLoop = new Date(dateEnd);
      const currentDate = new Date(dateStart);
      const listDate: string[] = [];
      while (currentDate <= endDateLoop) {
        listDate.push(currentDate.toUTCString().slice(5, 11));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // Find data relative with each item in listDate
      const dataValues: number[] = listDate.reduce((acc: number[], item) => {
        const idx = statisticOutcome.findIndex(
          (dateGroup) => item.slice(0, 2) === dateGroup._id.day.toString().slice(8, 11),
        );
        acc.push(idx >= 0 ? statisticOutcome[idx]?.total || 0 : 0);
        return acc;
      }, []);

      return {
        message: 'Success',
        data: {
          dataValuesCurrentWeek: dataValues.slice(0, 7),
          dateLabelsCurrentWeek: listDate.slice(0, 7),
          dataValuesPreviousWeek: dataValues.slice(7),
          dateLabelsPreviousWeek: listDate.slice(7),
        },
        status: HttpStatusCodes[201],
      };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default StatisticService;
