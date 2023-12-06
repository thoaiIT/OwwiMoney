import Category from '@/app/(dashboard)/category/Category';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Suspense } from 'react';

interface CategoryPageProps {
  searchParams: {
    page: number;
    pageSize: number;
  };
}

const Page = ({ searchParams }: CategoryPageProps) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE;
  return (
    <Suspense fallback={<Loading />}>
      <Title title="Category" />
      <Category />
    </Suspense>
  );
};

export default Page;
