import Transactions from '@/app/(dashboard)/transactions/Transactions';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import type { ObjectWithDynamicKeys } from '@/helper/type';
import { Fragment, Suspense } from 'react';

type SearchParams = { searchParams: ObjectWithDynamicKeys<string> };
const Page = async ({ searchParams }: SearchParams) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE;
  return (
    <Fragment>
      <Title title="Recent Transactions" />
      <Suspense fallback={<Loading />}>
        <Transactions
          page={page}
          pageSize={pageSize}
        />
      </Suspense>
    </Fragment>
  );
};

export default Page;
