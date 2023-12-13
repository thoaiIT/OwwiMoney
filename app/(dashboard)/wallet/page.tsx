import { getAllWallet } from '@/actions/controller/walletController';
import WalletList, { type WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import Loading from '@/components/loading';
import { Suspense } from 'react';

const Page = async () => {
  const result = await getAllWallet();
  const walletList = result.data?.wallets as WalletModel[];
  return (
    <>
      <Suspense fallback={<Loading />}>
        <WalletList walletList={walletList} />
      </Suspense>
    </>
  );
};

export default Page;
