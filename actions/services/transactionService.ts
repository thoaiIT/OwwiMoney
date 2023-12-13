import type { TransactionCreateType } from '@/actions/controller/transactionController';
import type TransactionRepository from '@/actions/repositories/transactionRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { HttpStatusCodes, type ObjectWithDynamicKeys } from '@/helper/type';
import { getServerSession } from 'next-auth';

class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async createTransaction(data: TransactionCreateType) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);
      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const transaction = await this.transactionRepository.createTransaction({ ...data, userId });
      return { message: 'Transaction Created', data: { transaction }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
  async getAllTransactionByUser(pageSize: number, page: number, filter?: ObjectWithDynamicKeys<string | number>) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const transactions = await this.transactionRepository.getAllTransactionByUser(
        userId,
        pageSize || DEFAULT_PAGE_SIZE,
        page || 1,
        filter,
      );
      return { message: 'Success', data: transactions, status: HttpStatusCodes[200] };
    } catch (error) {
      console.log({ error });
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getTransactionById(id: string) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const transaction = await this.transactionRepository.getTransactionById(id);
      return { message: 'Success', data: transaction, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default TransactionService;
