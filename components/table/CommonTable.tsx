import { CommonCard } from '@/components/card';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { useState } from 'react';

enum enumTable {
  name = 'hello',
  base = '1',
}

enum enumTableB {
  name = 'hello',
  base = '1',
}

type ColumnType<T> = {
  label: string;
  field: keyof T;
  customRender?: (row: T) => React.ReactNode;
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  headerTextAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  width?: string | number | undefined;
  sortable?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
};

const sortStates = ['default', 'asc', 'desc'];
const icons = [null, <ArrowUpIcon key="arrow-up" />, <ArrowDownIcon key="arrow-down" />];

const CommonTable = <TData,>({ data, columns }: TableProps<TData>): JSX.Element => {
  const [dataRender, setDataRender] = useState<TData[]>(data);
  const [sortState, setSortState] = useState(0);

  // const a = enumTableB.base;
  // console.log({ hehe: a as keyof typeof enumTable, haha: typeof enumTable });

  const sortHandler = (field: keyof TData) => {
    const nextSortState = sortState + 1 >= sortStates.length ? 0 : sortState + 1;
    setSortState(nextSortState);

    setDataRender(() => {
      const updatedData = [...data.map((item) => ({ ...item }))];
      console.log({ type: sortStates[nextSortState] });
      if (sortStates[nextSortState] === 'desc') return updatedData.sort((a, b) => (b[field] < a[field] ? -1 : 1));
      if (sortStates[nextSortState] === 'asc') return updatedData.sort((a, b) => (b[field] > a[field] ? -1 : 1));
      return data;
    });
  };

  return (
    <CommonCard className="w-1/2 p-4">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns &&
              columns.map((column) => {
                return (
                  <Table.ColumnHeaderCell
                    key={column.label}
                    onClick={
                      column.sortable
                        ? () => {
                            sortHandler(column.field);
                          }
                        : () => {}
                    }
                  >
                    <div className="flex justify-between">
                      <div>{column.label}</div>
                      <div>{icons[sortState]}</div>
                    </div>
                  </Table.ColumnHeaderCell>
                );
              })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataRender &&
            dataRender.map((row, i) => {
              return (
                <Table.Row key={`body-row-${i}-${new Date().getTime()}`}>
                  {columns.map((column, idx) => {
                    return (
                      <Table.Cell key={`body-row-cell-${column.label}-${idx}`}>
                        {row[column.field] as React.ReactNode}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
    </CommonCard>
  );
};

export default CommonTable;
