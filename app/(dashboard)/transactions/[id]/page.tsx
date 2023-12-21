import TransactionDetail from '@/app/(dashboard)/transactions/[id]/TransactionDetail';
import Loading from '@/components/loading';
import type { ObjectWithDynamicKeys } from '@/types';
import { Suspense } from 'react';

const Page = ({ params }: { params: ObjectWithDynamicKeys<string> }) => {
  return (
    <Suspense fallback={<Loading />}>
      <TransactionDetail id={params.id || ''} />
    </Suspense>
  );
};

export default Page;
