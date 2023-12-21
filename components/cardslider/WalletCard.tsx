import type { WalletStatisticType } from '@/actions/services/statisticService';
import { CommonCard } from '@/components/card';

const WalletCard = ({ wallet }: { wallet: WalletStatisticType }) => {
  return (
    <CommonCard className="rounded-3xl p-5 w-[300px] h-[210px] bg-orange-300 m-auto shadow-cardShadow">
      <div className="font-bold text-light-mode">{wallet.walletName || 'Wallet'}</div>
      <div className="flex items-center h-[60%]">
        <span className=" tracking-[5px] font-bold text-2xl text-light-mode">
          {wallet.walletAccountNumber?.toString()}
        </span>
      </div>
    </CommonCard>
  );
};

export default WalletCard;
