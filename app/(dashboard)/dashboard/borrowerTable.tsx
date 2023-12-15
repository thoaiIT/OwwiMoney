'use client';
import { getBorrowerByFilter } from '@/actions/controller/statisticController';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export interface BorrowerData {
  name: string;
  createdDate: string;
  amount: number;
  id: string;
}

const BorrowerTable = () => {
  const [borrowerList, setBorrowerList] = useState<BorrowerData[]>();
  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    (async () => {
      const result = await getBorrowerByFilter(query as string);

      setBorrowerList(result.data);
    })();
  }, [query]);
  const tableData: UseTableDataResult = useTableData();

  const columns: ColumnType<BorrowerData>[] = [
    {
      label: 'Name',
      field: 'name',
      sortable: true,
      customRender: (row: string) => <div className="py-2">{row}</div>,
    },
    {
      label: 'Date',
      field: 'createdDate',
      sortable: true,
    },
    {
      label: 'Amount',
      field: 'amount',
      sortable: true,
      customRender: (row: string) => <div className="py-2 font-bold text-green-700">{row}</div>,
    },
  ];
  return (
    <>
      <div
        key="search-partner-bar"
        className="flex justify-between bg-white-500  rounded-tl-2xl rounded-tr-2xl py-2"
      >
        <div className="flex gap-2 items-center shadow-md px-4 rounded-lg">
          <div>
            <MagnifyingGlassIcon />
          </div>
          <CommonInput
            name="searchKey"
            className="border-none hover:border-none outline-none shadow-none w-30"
            intent="simple"
            placeholder="Search by name..."
            value={query}
            onChange={(event) => {
              setQuery((prev) => event.target.value);
            }}
          />
        </div>
      </div>
      <CommonTable
        data={borrowerList || []}
        tableData={tableData}
        columns={columns}
        keyField={'id'}
        customBorderStyle="border-none shadow-none p-0 "
      />
    </>
  );
};

export default BorrowerTable;
