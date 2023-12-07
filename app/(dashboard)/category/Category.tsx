'use client';
import { createCategory, deleteCategory, type CategoryCreateType } from '@/actions/controller/categoryController';
import CategoryDialog from '@/app/(dashboard)/category/CategoryDialog';
import type { CategoryTableType } from '@/app/(dashboard)/category/page';
import CommonInput from '@/components/input';
import Loading from '@/components/loading';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryProps {
  dataTable: CategoryTableType[];
  totalPages: number;
}

const Category = ({ dataTable, totalPages }: CategoryProps) => {
  const router = useRouter();
  const tableData: UseTableDataResult = useTableData();
  const [isLoading, setIsLoading] = useState(false);

  const columns: ColumnType<CategoryTableType>[] = [
    {
      label: 'Image',
      field: 'categoryImage',
      customRender: (row) => {
        return (
          <Image
            src={row || 'https://cdn-icons-png.flaticon.com/512/1864/1864521.png'}
            alt="image"
            width={40}
            height={40}
            unoptimized
          />
        );
      },
      textAlign: 'center',
    },
    {
      label: 'Name',
      field: 'name',
      sortable: true,
    },
    {
      label: 'Type',
      field: 'typeName',
      sortable: true,
    },
    {
      label: 'Description',
      field: 'description',
      sortable: true,
      customRender: (row) => {
        return row && row.length > 32 ? row.substring(0, 32) + '...' : row;
      },
    },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const handleCreateCategpory = async (value: CategoryCreateType) => {
    setIsLoading(true);
    const result = await createCategory(value as CategoryCreateType);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      router.refresh();
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  };

  const handleEditCategory = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    const result = await deleteCategory(id);
    if (result.status?.code === 200) {
      toast.success(result.message as string);
      router.refresh();
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);

  return (
    <>
      {isLoading && <Loading />}
      <div
        key="search-partner-bar"
        className="flex justify-between bg-white-500 p-5 rounded-tl-2xl rounded-tr-2xl"
      >
        <div className="flex gap-2 items-center shadow-md px-4 rounded-lg">
          <div>
            <MagnifyingGlassIcon />
          </div>
          <CommonInput
            name="searchKey"
            className="border-none hover:border-none outline-none shadow-none w-60"
            intent="simple"
          />
        </div>
        <div>
          <CategoryDialog
            type="create"
            handleCreateCategpory={handleCreateCategpory}
          />
        </div>
      </div>
      {dataTable && (
        <CommonTable
          data={dataTable}
          tableData={tableData}
          columns={columns}
          keyField={'id'}
          useRowNumber
          usePagination
          customBorderStyle="rounded-tl-none rounded-tr-none"
          editHandler={handleEditCategory}
          deleteHandler={handleDeleteCategory}
        />
      )}
    </>
  );
};

export default Category;
