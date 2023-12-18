import TransactionDetail from '@/app/(dashboard)/transactions/[id]/TransactionDetail';
import type { ObjectWithDynamicKeys } from '@/types';

const Page = ({ params }: { params: ObjectWithDynamicKeys<string> }) => {
  return <TransactionDetail id={params.id || ''} />;
};

export default Page;
