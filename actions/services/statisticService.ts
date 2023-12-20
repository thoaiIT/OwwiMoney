import type StatisticRepository from '@/actions/repositories/statisticRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes } from '../../helper/type';

class StatisticService {
  private statisticReposiroty: StatisticRepository;

  constructor(statisticReposiroty: StatisticRepository) {
    this.statisticReposiroty = statisticReposiroty;
  }

  async getAmountByMonth(type: string, month: string) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }

      const currentYear = new Date().getFullYear();

      const monthNumber = parseInt(month, 10);
      let nextMonthNumber = monthNumber + 1;

      if (nextMonthNumber === 13) {
        nextMonthNumber = 1;
      }

      const startDate = new Date(`${currentYear}-${monthNumber < 10 ? `0${monthNumber}` : monthNumber}-01T00:00:00Z`);
      const endDate = new Date(
        `${monthNumber === 12 ? currentYear + 1 : currentYear}-${
          nextMonthNumber < 10 ? `0${nextMonthNumber}` : nextMonthNumber
        }-01T00:00:00Z`,
      );

      // Trừ đi 1 giây để lấy ngày cuối cùng của tháng trước
      endDate.setSeconds(endDate.getSeconds() - 1);

      const statisticOutcome = await this.statisticReposiroty.getAmountByMonth(type, startDate, endDate, userId);
      return statisticOutcome;
    } catch (error) {
      return { message: 'Invalid Server Error', status: HttpStatusCodes[500] };
    }
  }

  async getStatisticWeekly() {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const today = new Date();
      const dateStart = new Date(today);
      const dateEnd = new Date(today);
      dateStart.setDate(today.getDate() - today.getDay() + 1 - 7); // The start of previous week
      dateEnd.setDate(today.getDate() + (6 - today.getDay() + 1)); // The end of current week

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
          labelList: [listDate.slice(0, 7), listDate.slice(7)],
          dataList: [dataValues.slice(0, 7), dataValues.slice(7)],
          type: 'weekly',
        },
        status: HttpStatusCodes[200],
      };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getStatisticMonthly() {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const today = new Date();
      const dateStart = new Date(today.getFullYear() - 1, 0, 1); // The start of first date in previous year, start from 00:00:00 ISO
      const dateEnd = new Date(today.getFullYear(), 12, 1); // The end of last date in current year, end to 00:00:00 ISO

      //   Get List date of UTC Date
      const endDateLoop = new Date(dateEnd);
      const currentDate = new Date(dateStart);
      currentDate.setDate(currentDate.getDate() + 1); // Plus one for just get the Month in range 2 years
      endDateLoop.setDate(endDateLoop.getDate() - 1); // Minus one for just get the Month in range 2 years

      const listDate: string[] = [];
      const listLabel: string[] = [];
      while (currentDate <= endDateLoop) {
        listDate.push(currentDate.toISOString().slice(0, 7));
        listLabel.push(currentDate.toUTCString().slice(8, 11));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      const statisticOutcome = await this.statisticReposiroty.getMonthlyTotalOutcomeByDateRangeAndType({
        userId,
        typeName: 'Outcome',
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      });

      // Find data relative with each item in listDate
      const dataValues: number[] = listDate.reduce((acc: number[], item, i) => {
        const idx = statisticOutcome.findIndex((dateGroup) => {
          return dateGroup._id.month.toString().slice(0, 7) === item;
        });
        acc.push(idx >= 0 ? statisticOutcome[idx]?.total || 0 : 0);
        return acc;
      }, []);

      return {
        message: 'Success',
        data: {
          labelList: [listLabel.slice(0, 12), listLabel.slice(12)],
          dataList: [dataValues.slice(0, 12), dataValues.slice(12)],
          type: 'monthly',
        },
        status: HttpStatusCodes[200],
      };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getStatisticYearly() {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const today = new Date();
      const dateStart = new Date(today.getFullYear() - 4, 0, 1); // The start of first date in 5 year ago, start from 00:00:00 ISO
      const dateEnd = new Date(today.getFullYear(), 12, 1); // The end of last date in current year, end to 00:00:00 ISO is the start of the nex year

      const statisticOutcome = await this.statisticReposiroty.getYearlyTotalOutcomeByDateRangeAndType({
        userId,
        typeName: 'Outcome',
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      });

      //   Get List date of UTC Date
      const endDateLoop = new Date(dateEnd);
      const currentDate = new Date(dateStart);
      currentDate.setDate(currentDate.getDate() + 1); // Plus one for just get the Month in range 2 years
      endDateLoop.setDate(endDateLoop.getDate() - 1); // Minus one for just get the Month in range 2 years

      const listDate: string[] = [];
      while (currentDate <= endDateLoop) {
        listDate.push(currentDate.toISOString().slice(0, 4));
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }

      // Find data relative with each item in listDate
      const dataValues: number[] = listDate.reduce((acc: number[], item) => {
        const idx = statisticOutcome.findIndex((dateGroup) => {
          return dateGroup._id.year.toString().slice(0, 4) === item;
        });
        acc.push(idx >= 0 ? statisticOutcome[idx]?.total || 0 : 0);
        return acc;
      }, []);

      return {
        message: 'Success',
        data: {
          labelList: [listDate],
          dataList: [dataValues],
          type: 'yearly',
        },
        status: HttpStatusCodes[200],
      };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getNewTransactionByUser() {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const transactions = await this.statisticReposiroty.getNewTransactionByUser(userId);
      return { message: 'Success', data: transactions, status: HttpStatusCodes[200] };
    } catch (error) {
      console.log({ error });
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
  async getTransactionByType(type: string) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      let transactions;
      if (type !== 'All') {
        transactions = await this.statisticReposiroty.getTransactionByType(userId, type);
      } else {
        transactions = await this.statisticReposiroty.getAllTransaction(userId);
      }
      return { message: 'Success', data: transactions, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getBorrowerByFilter(query?: string) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const borrowers = await this.statisticReposiroty.getBorrowerByFilter(userId, query);
      return { message: 'Success', data: borrowers, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default StatisticService;
