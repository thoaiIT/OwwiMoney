import Transactions from '@/app/(dashboard)/transactions/Transactions';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import type { ObjectWithDynamicKeys } from '@/helper/type';
import { Suspense } from 'react';

type SearchParams = { searchParams: ObjectWithDynamicKeys<string> };
const Page = async ({ searchParams }: SearchParams) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE;
  const tab = searchParams.tab || '';
  return (
    <Suspense fallback={<Loading />}>
      <Title title="Recent Transactions" />
      <Transactions
        tab={tab}
        page={page}
        pageSize={pageSize}
      />
    </Suspense>
  );
};

export default Page;
