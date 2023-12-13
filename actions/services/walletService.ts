import type { WalletCreateType, WalletUpdateType } from '@/actions/controller/walletController';
import type WalletRepository from '@/actions/repositories/walletRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { HttpStatusCodes } from '@/helper/type';
import { getServerSession } from 'next-auth';

class WalletService {
  private walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async createWallet(data: WalletCreateType) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);
      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const wallet = await this.walletRepository.createWallet({ ...data, userId });
      return { message: 'Wallet Created', data: { wallet }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getAllWallet() {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const wallets = await this.walletRepository.getAllWallet(userId);
      return { message: 'Success', data: { wallets }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getWalletById(walletId: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const wallet = await this.walletRepository.getWalletById(walletId, userId);
    return { message: 'Success', data: { wallet }, status: HttpStatusCodes[200] };
  }

  async updateWallet(data: WalletUpdateType) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) return { message: 'User is not valid', status: HttpStatusCodes[401] };

    const walletExist = await this.walletRepository.getWalletById(data.walletId, userId);
    if (!walletExist) return { message: 'Wallet or User Invalid', status: HttpStatusCodes[422] };

    const wallet = await this.walletRepository.updateWallet({ ...data });
    return { message: 'Updated Successfully', data: { wallet }, status: HttpStatusCodes[200] };
  }

  async deleteWallet(walletId: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const walletExist = await this.walletRepository.getWalletById(walletId, userId);
    if (!walletExist) {
      return { message: 'Invalid wallet', status: HttpStatusCodes[422] };
    }

    const partner = await this.walletRepository.deleteWallet(walletId);
    return { message: 'Delete Successfully', data: { partner }, status: HttpStatusCodes[200] };
  }

  async getAllWalletType() {
    try {
      const walletTypes = await this.walletRepository.getAllWalletType();
      return { message: 'Success', data: { walletTypes }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getWalletTypeName(walletTypeId: string) {
    try {
      const walletTypeName = await this.walletRepository.getWalletTypeName(walletTypeId);
      return { message: 'Success', data: walletTypeName?.typeName, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async updateTotalBalance(totalBalance: number, walletId: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) return { message: 'User is not valid', status: HttpStatusCodes[401] };

    const walletExist = await this.walletRepository.getWalletById(walletId, userId);
    if (!walletExist) return { message: 'Wallet or User Invalid', status: HttpStatusCodes[422] };

    const wallet = await this.walletRepository.updateTotalBalance({ totalBalance, walletId });
    return { message: 'Updated Successfully', data: { wallet }, status: HttpStatusCodes[200] };
  }
}

export default WalletService;
