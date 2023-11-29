import client from '@/helper/lib/prismadb';

class WalletRepository {
  async getAllWallets(userId: string) {
    return await client.wallet.findMany({ where: { userId } });
  }
}

export default WalletRepository;
