import Transactions from '@/app/(dashboard)/transactions/Transactions';
import Title from '@/components/dashboard/Title';

const Page = async () => {
  return (
    <div>
      <Title title="Recent Transactions" />
      <Transactions temp="" />
    </div>
  );
};

export default Page;
