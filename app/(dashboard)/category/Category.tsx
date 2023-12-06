'use client';
import CategoryDialog from '@/app/(dashboard)/category/CategoryDialog';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Category = () => {
  const tableData: UseTableDataResult = useTableData();
  const categories = 1;
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
      {categories && (
        <CommonTable
          data={[]}
          tableData={tableData}
          columns={[
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
