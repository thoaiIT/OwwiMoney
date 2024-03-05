import type { TransactionCreateType, TransactionUpdateType } from '@/actions/controller/transactionController';
import { getTypeById } from '@/actions/controller/typeController';
import type TransactionRepository from '@/actions/repositories/transactionRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { uploadToCloudinary } from '@/helper/lib/cloudiary';
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

      const type = await getTypeById(data.typeId);
      const amount: number =
        type.data?.type?.name === 'Outcome' || type.data?.type?.name === 'Loan' ? -data.amount : data.amount;

      const transaction = await this.transactionRepository.createTransaction({
        ...data,
        userId,
        totalBalanceUpdate: amount,
      });

      return { message: 'Transaction Created', data: { transaction }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
  async getAllTransactionByUser(
    pageSize: number,
    page: number,
    filter?: ObjectWithDynamicKeys<string | number | boolean | undefined>,
  ) {
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
  async deleteTransaction(transactionId: string) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }

      const transactionExist = await this.getTransactionById(transactionId);
      if (!transactionExist.data) {
        return { message: 'Invalid Transaction or User', status: HttpStatusCodes[422] };
      }

      const type = await getTypeById(transactionExist.data?.typeId || '');
      const amount = transactionExist.data?.amount || 0;
      const deleteAmount: number =
        type.data?.type?.name === 'Outcome' || type.data?.type?.name === 'Loan' ? amount : -amount;

      // const transaction = await this.transactionRepository.createTransaction({
      //   ...data,
      //   userId,
      //   totalBalanceUpdate: amount,
      // });

      const deletedTransaction = await this.transactionRepository.deleteTransaction(
        transactionId,
        transactionExist.data?.walletId,
        deleteAmount,
      );
      return { message: 'Success', data: { deletedTransaction }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async updateTransaction(data: TransactionUpdateType) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const transactionExist = await this.transactionRepository.getTransactionById(data.id);
      if (!transactionExist) {
        return { message: 'Invalid Partner or User', status: HttpStatusCodes[422] };
      }

      let imageUrl = '';
      if (data.invoiceImageUrl) {
        imageUrl = (await uploadToCloudinary(data.invoiceImageUrl)) || '';
        if (!imageUrl) return { message: 'Failed to upload image', status: HttpStatusCodes[400] };
      }

      const transaction = await this.transactionRepository.updateTransaction({ ...data, invoiceImageUrl: imageUrl });
      console.log({ updateTransaction: transaction });
      return { message: 'Success', data: { transaction }, status: HttpStatusCodes[200] };
    } catch (error) {
      console.log({ error });
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default TransactionService;
