'use server';

import { uploadToCloudinary } from '@/actions/controller/transactionController';
import WalletRepository from '@/actions/repositories/walletRepository';
import WalletService from '@/actions/services/walletService';
import { HttpStatusCodes } from '@/helper/type';
import type { WalletModel } from '@/model/walletModel';
import type { Wallet } from '@prisma/client';

export type WalletCreateType = Pick<
  Wallet,
  'name' | 'description' | 'accountNumber' | 'walletTypeId' | 'totalBalance' | 'color' | 'walletImage'
>;
export type WalletUpdateType = WalletCreateType & { walletId: string };

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const createWallet = async (data: WalletCreateType) => {
  const result = await uploadToCloudinary(data.walletImage || '')
    .then(async (url) => {
      try {
        const result = await walletService.createWallet({ ...data, walletImage: url as string });
        return result;
      } catch (error) {
        console.error(error);
        return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
      }
    })
    .catch((error) => {
      console.log({ error });
      return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
    });
  console.log(result);
  return result as {
    message: string;
    status: { message: string; code: number } | undefined;
    data: { wallet: WalletModel };
  };
};

export const getAllWallet = async () => {
  try {
    return await walletService.getAllWallet();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getWalletById = async (walletId: string) => {
  try {
    return await walletService.getWalletById(walletId);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const updateWallet = async (data: WalletUpdateType, checkImage: boolean) => {
  const url = checkImage ? await uploadToCloudinary(data.walletImage || '') : data.walletImage;
  try {
    return await walletService.updateWallet({ ...data, walletImage: url as string });
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const deleteWallet = async (walletId: string) => {
  try {
    return await walletService.deleteWallet(walletId);
  } catch (error) {
    console.log(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getAllWalletType = async () => {
  try {
    return await walletService.getAllWalletType();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getWalletTypeName = async (walletTypeId: string) => {
  try {
    return await walletService.getWalletTypeName(walletTypeId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const updateTotalBalance = async (totalBalance: number, walletId: string) => {
  try {
    return await walletService.updateTotalBalance(totalBalance, walletId);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
