'use client';
import { CommonCard } from '@/components/card';
import TableBody from '@/components/table/TableBody';
import type { TableActionProps } from '@/components/table/TableBodyCell';
import TableHeader, { type ColumnType } from '@/components/table/TableHeader';
import { Table } from '@radix-ui/themes';
import { useEffect, useMemo, useState } from 'react';

type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
  keyField: keyof T;
  useCheckbox?: boolean;
  useRowNumber?: boolean;
};

const CommonTable = <TData,>({
  data,
  columns,
  keyField,
  useCheckbox,
  useRowNumber,
  editHandler,
  deleteHandler,
  customHandler,
}: TableProps<TData> & TableActionProps): JSX.Element => {
  const [dataRender, setDataRender] = useState<TData[]>(data);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const selectAllRowHandler = (checked: boolean) => {
    if (checked) {
      setSelectedKeys((prev) => {
        return data.map((item) => item[keyField] as string);
      });
    } else {
      setSelectedKeys((prev) => []);
    }
  };

  const selectHandler = (checked: boolean, key: string) => {
    if (checked) {
      setSelectedKeys((prev) => {
        const updated = [...prev];
        updated.push(key);
        return updated;
      });
    } else {
      setSelectedKeys((prev) => {
        return prev.filter((item) => item !== key);
      });
    }
  };

  const sortHandler = (nextSortState: string, field: keyof TData) => {
    setDataRender((prev: TData[]) => {
      const updatedData = [...prev.map((item) => ({ ...item }))];
      if (nextSortState === 'desc') return updatedData.sort((a, b) => (b[field] < a[field] ? -1 : 1));
      if (nextSortState === 'asc') return updatedData.sort((a, b) => (b[field] > a[field] ? -1 : 1));
      return data;
    });
  };

  const updatedColumns = useMemo(() => {
    const updated = [...columns.map((item) => ({ ...item }))];
    if (useCheckbox) {
      updated.unshift({ label: ' ', field: keyField, type: 'checkbox' });
    }

    if (useRowNumber) {
      updated.unshift({
        label: 'No',
        field: keyField,
        type: 'rowNumber',
        textAlign: 'center',
        headerTextAlign: 'center',
      });
    }
    return updated;
  }, [columns, useCheckbox, useRowNumber]);

  useEffect(() => {
    console.log({ selectedKeys });
  }, [selectedKeys]);

  return (
    <CommonCard className="w-full p-4">
      <Table.Root>
        <TableHeader
          columns={updatedColumns}
          sortHandler={sortHandler}
          selectAllRowHandler={selectAllRowHandler}
        />

        <TableBody
          columns={updatedColumns}
          data={dataRender}
          keyField={keyField}
          selectedKeys={selectedKeys}
          selectHandler={selectHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          customHandler={customHandler}
        />
      </Table.Root>
    </CommonCard>
  );
};

export default CommonTable;
