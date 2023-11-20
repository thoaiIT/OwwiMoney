import { CommonCard } from '@/components/card';
import TableBody from '@/components/table/TableBody';
import TableHeader, { type ColumnType } from '@/components/table/TableHeader';
import { Table } from '@radix-ui/themes';
import { useState } from 'react';

type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
  keyField: keyof T;
};

const CommonTable = <TData,>({ data, columns, keyField }: TableProps<TData>): JSX.Element => {
  const [dataRender, setDataRender] = useState<TData[]>(data);

  const sortHandler = (nextSortState: string, field: keyof TData) => {
    setDataRender((prev: TData[]) => {
      const updatedData = [...prev.map((item) => ({ ...item }))];
      if (nextSortState === 'desc') return updatedData.sort((a, b) => (b[field] < a[field] ? -1 : 1));
      if (nextSortState === 'asc') return updatedData.sort((a, b) => (b[field] > a[field] ? -1 : 1));
      return data;
    });
  };

  return (
    <CommonCard className="w-1/2 p-4">
      <Table.Root>
        <TableHeader
          columns={columns}
          sortHandler={sortHandler}
        />

        <TableBody
          columns={columns}
          data={dataRender}
        />
      </Table.Root>
    </CommonCard>
  );
};

export default CommonTable;
