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
}

export default TransactionRepository;
