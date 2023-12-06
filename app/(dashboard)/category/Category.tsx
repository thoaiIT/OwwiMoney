'use client';
import CategoryDialog from '@/app/(dashboard)/category/CategoryDialog';
import type { CategoryTableType } from '@/app/(dashboard)/category/page';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect } from 'react';

interface CategoryProps {
  dataTable: CategoryTableType[];
  totalPages: number;
}

const Category = ({ dataTable, totalPages }: CategoryProps) => {
  const tableData: UseTableDataResult = useTableData();

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
    console.log('cvvvv');
  }, [totalPages]);

  console.log({ dataTable });
  return (
    <>
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
          <CategoryDialog type="create" />
        </div>
      </div>
      {dataTable && (
        <CommonTable
          data={dataTable}
          tableData={tableData}
          columns={[
            {
              label: 'Image',
              field: 'categoryImage',
              customRender: (row) => {
                console.log(row);

                return (
                  <Image
                    src={row || ''}
                    alt="image"
                    width={24}
                    height={24}
                  />
                );
              },
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
            { label: 'Description', field: 'description', sortable: true },
            { label: 'Actions', field: 'id', type: 'action' },
          ]}
          keyField={'id'}
          useRowNumber
          usePagination
          customBorderStyle="rounded-tl-none rounded-tr-none"
        />
      )}
    </>
  );
};

export default Category;
