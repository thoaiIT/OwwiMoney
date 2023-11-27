import Transactions, { type TransactionTableType } from '@/app/(dashboard)/transactions/Transactions';
import Title from '@/components/dashboard/Title';

const data: TransactionTableType[] = [];

const Page = () => {
  return (
    <div>
      <Title title="Recent Transactions" />
      <Transactions dataTable={data} />
    </div>
  );
};

export default Page;
