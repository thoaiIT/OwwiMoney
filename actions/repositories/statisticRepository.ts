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

  // async getIncomeByMonth() {
  //   const db = await connectToDatabase();
  //   const results = await db
  //     .collection('Transaction')
  //     .aggregate([
  //       {
  //         $match: {
  //           userId: new ObjectId(userId),
  //           createdDate: {
  //             $gte: new Date(dateStart),
  //             $lte: new Date(dateEnd),
  //           },
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'Type',
  //           localField: 'typeId',
  //           foreignField: '_id',
  //           as: 'type',
  //         },
  //       },
  //       {
  //         $match: {
  //           'type.name': typeName,
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: {
  //             year: { $substr: ['$createdDate', 0, 4] }, // Extract year part
  //           },
  //           total: { $sum: '$amount' },
  //         },
  //       },
  //       {
  //         $sort: {
  //           '_id.year': 1, // Sort by year in ascending order
  //         },
  //       },
  //     ])
  //     .toArray();

  //   return results;
  // }
}

export default StatisticRepository;
