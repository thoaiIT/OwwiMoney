import type { WalletCreateType, WalletUpdateType } from '@/actions/controller/walletController';
import prisma from '../../helper/lib/prismadb';

class WalletRepository {
  async createWallet({
    name,
    description,
    accountNumber,
    walletTypeId,
    totalBalance,
    userId,
    color,
    walletImage,
  }: WalletCreateType & { userId: string }) {
    return await prisma.wallet.create({
      data: {
        name,
        description,
        accountNumber,
        walletTypeId,
        totalBalance,
        userId,
        deleted: false,
        color,
        walletImage,
      },
      include: {
        walletType: {
          select: {
            typeName: true,
          },
        },
      },
    });
  }
  async getAllWalletType() {
    return await prisma.walletType.findMany();
  }

  async getWalletById(walletId: string, userId: string) {
    return await prisma.wallet.findFirst({
      where: {
        id: walletId,
        userId,
        deleted: false,
      },
      include: {
        walletType: {
          select: {
            typeName: true,
          },
        },
      },
    });
  }

  async updateWallet({
    accountNumber,
    color,
    name,
    totalBalance,
    walletId,
    walletTypeId,
    description,
    walletImage,
  }: WalletUpdateType) {
    return await prisma.wallet.update({
      where: { id: walletId },
      data: { accountNumber, color, name, totalBalance, walletTypeId, description, deleted: false, walletImage },
      include: {
        walletType: {
          select: {
            typeName: true,
          },
        },
      },
    });
  }

  async deleteWallet(walletId: string) {
    return await prisma.wallet.update({
      where: { id: walletId },
      data: { deleted: true },
    });
  }

  async getWalletTypeName(walletTypeId: string) {
    return prisma.walletType.findFirst({ where: { id: walletTypeId } });
  }

  async getAllWallet(userId: string) {
    return await prisma.wallet.findMany({
      where: { userId, deleted: false },
      include: {
        walletType: {
          select: {
            typeName: true,
          },
        },
      },
    });
  }

  async updateTotalBalance({ totalBalance, walletId }: { totalBalance: number; walletId: string }) {
    return await prisma.wallet.update({
      where: { id: walletId },
      data: { totalBalance: { increment: totalBalance } },
    });
  }
}

export default WalletRepository;
