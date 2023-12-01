import type { TransactionCreateType } from '@/actions/controller/transactionController';
import client from '@/helper/lib/prismadb';

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
      },
    });
  }

  async getAllTransactionByUser(userId: string, pageSize: number, page: number) {
    const [transactions, total] = await Promise.all([
      client.transaction.findMany({
        // where: { userId, deleted: false },
        where: {
          userId,
        },
        include: { type: true, category: true, partner: true, wallet: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      client.transaction.count({
        // where: { userId, deleted: false },
        where: { userId },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    return {
      transactions: transactions.map((transaction) => {
        const formatTransaction = {
          ...transaction,
          createdDate: String(transaction.createdDate),
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
}

export default TransactionRepository;
