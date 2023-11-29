import type { WalletCreateType } from '@/actions/controller/walletController';
import prisma from '../../helper/lib/prismadb';

class WalletRepository {
  async createWallet({
    name,
    description,
    accountNumber,
    walletTypeId,
    totalBalance,
    userId,
  }: WalletCreateType & { userId: string }) {
    return await prisma.wallet.create({
      data: { name, description, accountNumber, walletTypeId, totalBalance, userId, deleted: false },
    });
  }
  async getAllWalletType() {
    return await prisma.walletType.findMany();
  }

  async getWalletTypeName(walletTypeId: string) {
    return prisma.walletType.findFirst({ where: { id: walletTypeId } });
  }

  async getAllWallet() {
    return await prisma.wallet.findMany();
  }
}

export default WalletRepository;
