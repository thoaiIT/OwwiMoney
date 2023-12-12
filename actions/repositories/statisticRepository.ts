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
    console.log({ dateStart, dateEnd, typeName, userId });
    // const transactions = await client.transaction.findMany({
    //   where: {
    //     userId: userId,
    //     createdDate: {
    //       gte: dateStart,
    //       lte: dateEnd,
    //     },
    //     type: {
    //       name: typeName,
    //     },
    //   },
    //   include: { type: true },
    // });
    const db = await connectToDatabase();
    const collection = db.collection('Transaction');
    const result = await collection
      .find({
        createdAt: {
          $gte: new Date(dateStart),
          $lte: new Date(dateEnd),
        },
      })
      .toArray();
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
          $group: {
            _id: {
              //   $substr: ['$createdDate', 0, 10], // Extract year-month-day part
              day: { $substr: ['$createdDate', 0, 10] }, // Extract year-month-day part
              typeId: '$typeId',
            },
            TotalOfADay: { $sum: '$amount' },
          },
        },
      ])
      .toArray();
    console.log({ results: JSON.stringify(results) });

    const transactions = await client.transaction.groupBy({
      by: ['createdAt'],
      where: {
        userId: userId,
        createdDate: {
          gte: dateStart,
          lte: dateEnd,
        },
        type: {
          name: typeName,
        },
      },
      _sum: {
        amount: true,
      },
    });
    return transactions;
  }
}

export default StatisticRepository;
