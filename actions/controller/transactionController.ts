'use server';
import { getTypeById } from '@/actions/controller/typeController';
import { getWalletById, updateTotalBalance } from '@/actions/controller/walletController';
import TransactionRepository from '@/actions/repositories/transactionRepository';
import TransactionService from '@/actions/services/transactionService';
import { uploadToCloudinary } from '@/helper/lib/cloudiary';
import { HttpStatusCodes } from '@/helper/type';
import type { Transaction } from '@prisma/client';

export type TransactionCreateType = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'createdDate'> & {
  createdDate: string;
};

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);

export const createTransaction = async (data: TransactionCreateType) => {
  const result = uploadToCloudinary(data.invoiceImageUrl || '')
    .then(async (url) => {
      try {
        const result = await transactionService.createTransaction({ ...data, invoiceImageUrl: url as string });
        return result;
      } catch (error) {
        return { message: 'Cannot create new transaction!!', status: HttpStatusCodes[500] };
      }
    })
    .then(async (result) => {
      try {
        const type = await getTypeById(data.typeId);
        const amount: number =
          type.data?.type?.name === 'Outcome' || type.data?.type?.name === 'Loan' ? -data.amount : data.amount;

        const update = await updateTotalBalance(amount, data.walletId);
        if (update.status?.code === 200) {
          return result;
        } else return update;
      } catch (error) {
        return { message: 'Fail to update Total Balance of wallet', status: HttpStatusCodes[500] };
      }
    })
    .catch((error) => {
      console.log({ error });
      return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
    });
  return result;
};

export const getAllTransactionByUser = async (pageSize: number, page: number) => {
  try {
    return await transactionService.getAllTransactionByUser(pageSize, page);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const checkWalletInfo = async (walletId: string, typeId: string, amount: number) => {
  const type = await getTypeById(typeId);
  if (type.data?.type?.name === 'Outcome' || type.data?.type?.name === 'Loan') {
    amount = -amount;
  }
  const walletInfo = await getWalletById(walletId);
  if (Number(walletInfo.data?.wallet?.totalBalance) + amount < 0) {
    return {
      message: `Amount must be smaller than ${walletInfo.data?.wallet?.name || 'wallet'}'s Total Balance (${
        walletInfo.data?.wallet?.totalBalance || 0
      })`,
      status: HttpStatusCodes[400],
    };
  }

  return { message: 'OK', status: HttpStatusCodes[200] };
};
