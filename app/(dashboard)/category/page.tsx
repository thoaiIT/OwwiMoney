import { getAllCategoryByUser, type CategoryCreateType } from '@/actions/controller/categoryController';
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

export type CategoryTableType = CategoryCreateType & { id: string; typeName: string };

const Page = async ({ searchParams }: CategoryPageProps) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE;
  const response = await getAllCategoryByUser(pageSize, page);
  const data: CategoryTableType[] = response.data?.categories || [];
  const totalPages: number = response.data?.totalPages || 0;
  return (
    <Suspense fallback={<Loading />}>
      <Title title="Category" />
      <Category
        dataTable={data}
        totalPages={totalPages}
      />
    </Suspense>
  );
};

export default Page;
