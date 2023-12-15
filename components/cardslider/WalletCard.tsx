import { CommonCard } from '@/components/card';

const WalletCard = () => {
  return (
    <CommonCard className="rounded-3xl p-5 w-[300px] h-[210px] bg-orange-300 m-auto shadow-cardShadow">
      <div className="font-bold text-light-mode">Cash wallet</div>
      <div className="flex items-center h-[60%]">
        <span className=" tracking-[5px] font-bold text-2xl text-light-mode">0123 **** **** 9999</span>
      </div>
    </CommonCard>
  );
};

export default WalletCard;
