import { connectToDatabase } from '@/helper/lib/mongoConnect';
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
              //   $substr: ['$createdDate', 0, 10], // Extract year-month-day part
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
}

export default StatisticRepository;
