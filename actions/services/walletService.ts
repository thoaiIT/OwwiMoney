import type WalletRepository from '@/actions/repositories/walletRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { HttpStatusCodes } from '@/helper/type';
import { getServerSession } from 'next-auth';

class WalletService {
  private walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async getAllWallets() {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const types = await this.walletRepository.getAllWallets(userId);
      return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default WalletService;
