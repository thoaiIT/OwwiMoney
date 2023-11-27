import WalletList from '@/app/(dashboard)/wallet/WalletList';
import Title from '@/components/dashboard/Title';

const Page = () => {
  return (
    <>
      <Title title="Wallets" />
      <WalletList />
    </>
  );
};

export default Page;
