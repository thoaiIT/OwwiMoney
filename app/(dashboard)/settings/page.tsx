import Settings from '@/app/(dashboard)/settings/Settings';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import { Suspense } from 'react';

const Page = () => {
  return (
    <>
      <Title title="Settings" />
      <Suspense fallback={<Loading />}>
        <Settings />
      </Suspense>
    </>
  );
};

export default Page;
