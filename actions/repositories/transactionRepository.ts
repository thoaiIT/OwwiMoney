import type { TransactionCreateType } from '@/actions/controller/transactionController';
import client from '@/helper/lib/prismadb';
import type { ObjectWithDynamicKeys } from '@/helper/type';

class TransactionRepository {
  async createTransaction({
    typeId,
    userId,
    categoryId,
    partnerId,
    walletId,
    amount,
    createdDate,
    description,
    invoiceImageUrl,
    status,
  }: TransactionCreateType & { userId: string }) {
    return await client.transaction.create({
      data: {
        typeId,
        userId,
        categoryId,
        partnerId,
        walletId,
        amount,
        createdDate: new Date(createdDate),
        description,
        invoiceImageUrl,
        status,
      },
    });
  }

  async getAllTransactionByUser(
    userId: string,
    pageSize: number,
    page: number,
    filter?: ObjectWithDynamicKeys<string | number>,
  ) {
    const [transactions, total] = await Promise.all([
      client.transaction.findMany({
        where: {
          userId,
          ...filter,
          deleted: false,
        },
        include: { type: true, category: true, partner: true, wallet: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      client.transaction.count({
        where: { userId, ...filter, deleted: false },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    return {
      transactions: transactions.map((transaction) => {
        const formatTransaction = {
          ...transaction,
          createdDate: `${transaction.createdDate.getDay()}-${
            transaction.createdDate.getMonth() + 1
          }-${transaction.createdDate.getFullYear()}`,
          typeName: transaction.type.name,
          categoryName: transaction.category.name,
          partnerName: transaction.partner.name,
          walletName: transaction.wallet.name,
        };
        return formatTransaction;
      }),
      totalPages,
    };
  }

  async getTransactionById(id: string) {
    const transaction = await client.transaction.findFirst({
      where: {
        id,
      },
    });
    return !transaction
      ? transaction
      : {
          ...transaction,
          createdDate: `${transaction.createdDate.getDay()}-${
            transaction.createdDate.getMonth() + 1
          }-${transaction.createdDate.getFullYear()}`,
        };
  }
}

export default TransactionRepository;
