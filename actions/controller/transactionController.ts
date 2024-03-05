'use server';
import { getWalletById } from '@/actions/controller/walletController';
import TransactionRepository from '@/actions/repositories/transactionRepository';
import TransactionService from '@/actions/services/transactionService';
import { uploadToCloudinary } from '@/helper/lib/cloudiary';
import { HttpStatusCodes, type ObjectWithDynamicKeys } from '@/helper/type';
import type { Transaction } from '@prisma/client';

export type TransactionCreateType = Omit<
  Transaction,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'createdDate' | 'deleted'
> & {
  createdDate: string;
};

export type TransactionUpdateType = Omit<
  Transaction,
  'userId' | 'createdAt' | 'updatedAt' | 'createdDate' | 'deleted'
> & {
  createdDate: string;
  updatedAmount?: number;
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
    // .then(async (result) => {
    //   try {
    //     if (update.status?.code === 200) {
    //       return result;
    //     } else return update;
    //   } catch (error) {
    //     return { message: 'Fail to update Total Balance of wallet', status: HttpStatusCodes[500] };
    //   }
    // })
    .catch((error) => {
      return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
    });
  return result;
};

export const getAllTransactionByUser = async (
  pageSize: number,
  page: number,
  filter?: ObjectWithDynamicKeys<string | number | boolean | undefined>,
) => {
  try {
    return await transactionService.getAllTransactionByUser(pageSize, page, filter);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getTransactionById = async (id: string) => {
  try {
    return await transactionService.getTransactionById(id);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const checkWalletInfo = async (walletId: string, amount: number) => {
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

export const deleteTransaction = async (transactionId: string) => {
  try {
    return await transactionService.deleteTransaction(transactionId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const updateTransaction = async (data: TransactionUpdateType) => {
  try {
    return await transactionService.updateTransaction(data);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
