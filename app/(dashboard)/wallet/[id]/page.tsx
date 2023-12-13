import { getWalletById } from '@/actions/controller/walletController';
import WalletDetail from '@/app/(dashboard)/wallet/[id]/WalletDetail';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
  const result = await getWalletById(params.id as string);
  const newWallet = result.data?.wallet as WalletModel;

  if (result.status?.code !== 200) redirect('/wallet');
  return (
    <WalletDetail
      newWallet={newWallet}
      walletId={params.id}
    />
  );
};

export default Page;
