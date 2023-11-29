'use server';

import WalletRepository from '@/actions/repositories/walletRepository';
import WalletService from '@/actions/services/walletService';
import { HttpStatusCodes } from '@/helper/type';

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const getAllWallets = async () => {
  try {
    const allWallets = await walletService.getAllWallets();
    return allWallets;
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
