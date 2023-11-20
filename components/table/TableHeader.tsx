import { Table } from '@radix-ui/themes';
import { useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

export type ColumnType<T> = {
  label: string;
  field: keyof T;
  customRender?: (row: T) => React.ReactNode;
  type?: 'checkbox' | 'number' | 'action';
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  headerTextAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  width?: string | number | undefined;
  sortable?: boolean;
  currentSort?: number;
};

type Props<T> = {
  columns: ColumnType<T>[];
  sortHandler: (nextSortState: string, field: keyof T) => void;
};

const sortStates = ['default', 'asc', 'desc'];

const icons = [null, <ArrowUpIcon key="arrow-up" />, <ArrowDownIcon key="arrow-down" />];

const TableHeader = <TData,>({ columns, sortHandler }: Props<TData>) => {
  const [columnRender, setColumnRender] = useState<ColumnType<TData>[]>(columns);

  const onSort = (field: keyof TData) => {
    const columnIdx = columnRender.findIndex((column) => column.field === field);
    const sortState = Number(columnRender[columnIdx]?.currentSort) || 0;
    const nextSortState = sortState + 1 >= sortStates.length ? 0 : sortState + 1;
    setColumnRender((prev) => {
      const updatedColumns = [
        ...prev.map((item, idx) => ({ ...item, currentSort: idx === columnIdx ? nextSortState : item.currentSort })),
      ];
      console.log({ updatedColumns });
      return updatedColumns;
    });
    sortHandler(String(sortStates[nextSortState]), field);
  };

  return (
    <Table.Header>
      <Table.Row>
        {columnRender &&
          columnRender.map((column) => {
            console.log({ icons: column.currentSort || 0 });
            return (
              <Table.ColumnHeaderCell
                key={column.label}
                onClick={
                  column.sortable
                    ? () => {
                        onSort(column.field);
                      }
                    : () => {}
                }
              >
                <div className="flex gap-2 items-center">
                  <div>{column.label}</div>
                  <span>{icons[column.currentSort || 0]}</span>
                </div>
              </Table.ColumnHeaderCell>
            );
          })}
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeader;
