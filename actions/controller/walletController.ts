'use server';

import WalletRepository from '@/actions/repositories/walletRepository';
import WalletService from '@/actions/services/walletService';
import { HttpStatusCodes } from '@/helper/type';
import type { Wallet } from '@prisma/client';

export type WalletCreateType = Pick<Wallet, 'name' | 'description' | 'accountNumber' | 'walletTypeId' | 'totalBalance'>;

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const createWallet = async (data: WalletCreateType) => {
  try {
    const result = await walletService.createWallet(data);
    return result;
  } catch (error) {
    console.error(error);
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

export const getAllWallet = async () => {
  try {
    return await walletService.getAllWallet();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
