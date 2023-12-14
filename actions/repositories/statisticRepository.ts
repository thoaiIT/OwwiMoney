import { connectToDatabase } from '@/helper/lib/mongoConnect';
import client from '@/helper/lib/prismadb';
import { ObjectId } from 'mongodb';

export type TransactionByDateRangeAndType = {
  dateStart: string;
  dateEnd: string;
  typeName: string;
};

class StatisticRepository {
  async getTransactionByDateRangeAndType({
    dateStart,
    dateEnd,
    typeName,
    userId,
  }: TransactionByDateRangeAndType & { userId: string }) {
    const db = await connectToDatabase();
    const results = await db
      .collection('Transaction')
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
            createdDate: {
              $gte: new Date(dateStart),
              $lte: new Date(dateEnd),
            },
          },
        },
        {
          $lookup: {
            from: 'Type',
            localField: 'typeId',
            foreignField: '_id',
            as: 'type',
          },
        },
        {
          $match: {
            'type.name': typeName,
          },
        },
        {
          $group: {
            _id: {
              day: { $substr: ['$createdDate', 0, 10] }, // Extract year-month-day part
            },
            total: { $sum: '$amount' },
          },
        },
        {
          $sort: {
            '_id.day': 1, // Sort by day in ascending order
          },
        },
      ])
      .toArray();

    return results;
  }

  async getMonthlyTotalOutcomeByDateRangeAndType({
    dateStart,
    dateEnd,
    typeName,
    userId,
  }: TransactionByDateRangeAndType & { userId: string }) {
    const db = await connectToDatabase();
    const results = await db
      .collection('Transaction')
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
            createdDate: {
              $gte: new Date(dateStart),
              $lte: new Date(dateEnd),
            },
          },
        },
        {
          $lookup: {
            from: 'Type',
            localField: 'typeId',
            foreignField: '_id',
            as: 'type',
          },
        },
        {
          $match: {
            'type.name': typeName,
          },
        },
        {
          $group: {
            _id: {
              month: { $substr: ['$createdDate', 0, 7] }, // Extract year-month part
            },
            total: { $sum: '$amount' },
          },
        },
        {
          $sort: {
            '_id.month': 1, // Sort by month in ascending order
          },
        },
      ])
      .toArray();

    return results;
  }

  async getYearlyTotalOutcomeByDateRangeAndType({
    dateStart,
    dateEnd,
    typeName,
    userId,
  }: TransactionByDateRangeAndType & { userId: string }) {
    const db = await connectToDatabase();
    const results = await db
      .collection('Transaction')
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
            createdDate: {
              $gte: new Date(dateStart),
              $lte: new Date(dateEnd),
            },
          },
        },
        {
          $lookup: {
            from: 'Type',
            localField: 'typeId',
            foreignField: '_id',
            as: 'type',
          },
        },
        {
          $match: {
            'type.name': typeName,
          },
        },
        {
          $group: {
            _id: {
              year: { $substr: ['$createdDate', 0, 4] }, // Extract year part
            },
            total: { $sum: '$amount' },
          },
        },
        {
          $sort: {
            '_id.year': 1, // Sort by year in ascending order
          },
        },
      ])
      .toArray();

    return results;
  }

  async getAmountByMonth(type: string, startDate: Date, endDate: Date, userId: string) {
    const aggregate = await client.transaction.groupBy({
      by: 'categoryId',
      _sum: {
        amount: true,
      },
      where: {
        type: {
          name: type,
        },
        createdDate: {
          gte: startDate,
          lte: endDate,
        },
        userId: userId,
        deleted: false,
      },
    });
    const categories = await client.category.findMany({
      where: {
        userId: userId,
        deleted: false,
      },
    });
    const summary = [];
    for (let i = 0; i < aggregate.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (aggregate && categories && aggregate[i]?.categoryId === categories[j]?.id) {
          const element = {
            ...aggregate[i],
            categoryName: categories[j]?.name,
          };
          summary.push(element);
        }
      }
    }
    console.log({ startDate, endDate, summary });
    return summary;
  }
  async getNewTransactionByUser(userId: string) {
    const transactions = await client.transaction.findMany({
      where: {
        userId,
        deleted: false,
      },
      include: {
        partner: { select: { name: true, image: true } }, // Lựa chọn các trường bạn muốn bao gồm cho partner
      },
      orderBy: { createdDate: 'desc' }, // Sắp xếp theo createdDate giảm dần
      take: 5,
    });

    return transactions.map((item) => ({
      name: item.partner.name,
      image: item.partner.image,
      id: item.id,
    }));
  }
}

export default StatisticRepository;
