import type { TransactionCreateType, TransactionUpdateType } from '@/actions/controller/transactionController';
import client from '@/helper/lib/prismadb';
import type { ObjectWithDynamicKeys } from '@/helper/type';

const formatDateMonth = (n: number) => (n < 10 ? `0${n}` : `${n}`);

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
    totalBalanceUpdate,
  }: TransactionCreateType & { userId: string; totalBalanceUpdate: number }) {
    const [newTransaction] = await client.$transaction([
      client.transaction.create({
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
      }),
      client.wallet.update({
        where: { id: walletId },
        data: { totalBalance: { increment: totalBalanceUpdate } },
      }),
    ]);
    return newTransaction;
  }

  async getAllTransactionByUser(
    userId: string,
    pageSize: number,
    page: number,
    filter?: ObjectWithDynamicKeys<string | number | boolean | undefined>,
  ) {
    const [transactions, total] = await Promise.all([
      client.transaction.findMany({
        where: {
          userId,
          deleted: false,
          ...filter,
        },
        include: { type: true, category: true, partner: true, wallet: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdDate: 'desc',
        },
      }),
      client.transaction.count({
        where: { userId, deleted: false, ...filter },
      }),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    return {
      transactions: transactions.map((transaction) => {
        const formatTransaction = {
          ...transaction,
          createdDate: `${transaction.createdDate.getFullYear()}-${formatDateMonth(
            transaction.createdDate.getMonth() + 1,
          )}-${formatDateMonth(transaction.createdDate.getDate())}`,
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
      include: {
        type: true,
      },
    });
    return !transaction
      ? transaction
      : {
          ...transaction,
          type: transaction.type.name,
          createdDate: `${transaction.createdDate.getDate()}-${
            transaction.createdDate.getMonth() + 1
          }-${transaction.createdDate.getFullYear()}`,
        };
  }

  async deleteTransaction(transactionId: string, walletId: string, totalBalanceUpdate: number) {
    const [deleteTransaction] = await client.$transaction([
      client.transaction.update({
        where: { id: transactionId },
        data: { deleted: true },
      }),
      client.wallet.update({
        where: { id: walletId },
        data: { totalBalance: { increment: totalBalanceUpdate } },
      }),
    ]);
    return deleteTransaction;
  }

  async removeTransaction(transactionId: string) {
    return await client.transaction.delete({
      where: { id: transactionId },
    });
  }

  async updateTransaction({
    id,
    partnerId,
    typeId,
    categoryId,
    amount,
    createdDate,
    invoiceImageUrl,
    status,
    walletId,
    description,
    updatedAmount,
  }: TransactionUpdateType) {
    console.log('typeof createdDate', createdDate, new Date(createdDate));
    const [updateTransaction] = await client.$transaction([
      client.transaction.update({
        where: { id: id },
        data: {
          typeId,
          categoryId,
          deleted: false,
          partnerId,
          amount,
          description,
          createdDate: new Date(createdDate),
          invoiceImageUrl,
          status,
          walletId,
        },
      }),
      client.wallet.update({
        where: { id: walletId },
        data: { totalBalance: { increment: updatedAmount } },
      }),
    ]);
    return updateTransaction;
  }
}

export default TransactionRepository;
