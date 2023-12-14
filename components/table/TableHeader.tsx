import * as Checkbox from '@radix-ui/react-checkbox';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import clsx from 'clsx';
import React, { useState } from 'react';

export type ColumnType<T> = {
  label: string | React.ReactNode;
  field: keyof T;
  customRender?: (row: string) => React.ReactNode;
  type?: 'checkbox' | 'rowNumber' | 'action';
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  headerTextAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  width?: string | number | undefined;
  sortable?: boolean;
  currentSort?: number;
  showFooterTotal?: boolean;
};

type Props<T> = {
  columns: ColumnType<T>[];
  sortHandler: (nextSortState: string, field: keyof T) => void;
  selectAllRowHandler: (checked: boolean) => void;
};

const sortStates = ['default', 'asc', 'desc'];

const icons = [null, <ArrowUpIcon key="arrow-up" />, <ArrowDownIcon key="arrow-down" />];

const TableHeader = <TData,>({ columns, sortHandler, selectAllRowHandler }: Props<TData>) => {
  const [columnRender, setColumnRender] = useState<ColumnType<TData>[]>(columns);

  const onSort = (field: keyof TData) => {
    const columnIdx = columnRender.findIndex((column) => column.field === field);
    const sortState = Number(columnRender[columnIdx]?.currentSort) || 0;
    const nextSortState = sortState + 1 >= sortStates.length ? 0 : sortState + 1;
    setColumnRender((prev) => {
      const updatedColumns = [
        ...prev.map((item, idx) => ({ ...item, currentSort: idx === columnIdx ? nextSortState : item.currentSort })),
      ];
      return updatedColumns;
    });
    sortHandler(String(sortStates[nextSortState]), field);
  };

  return (
    <Table.Header>
      <Table.Row>
        {columnRender &&
          columnRender.map((column) => {
            return (
              <Table.ColumnHeaderCell
                className={`w-[${column.width}px]`}
                key={`header-column-${column.label}`}
                onClick={
                  column.sortable
                    ? () => {
                        onSort(column.field);
                      }
                    : () => {}
                }
              >
                <div
                  className={clsx([
                    'flex gap-0 items-start font-semibold align-middle text-color-mute py-2 sm:px-1',
                    column.headerTextAlign === 'center' || column.type === 'action' ? 'justify-center' : '',
                    'relative',
                  ])}
                >
                  {column.type === 'checkbox' && (
                    <>
                      <Checkbox.Root
                        className={clsx([
                          'self-end shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none justify-center rounded-[3px] bg-white outline-none border-2',
                          column.textAlign === 'center' ? 'mx-auto' : '',
                        ])}
                        id="c1"
                        onCheckedChange={selectAllRowHandler}
                      >
                        <Checkbox.Indicator className="text-violet11 flex justify-center">
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </>
                  )}
                  {column.type !== 'checkbox' && (
                    <>
                      <div className="text-black font-bold">{column.label}</div>
                      <span>{icons[column.currentSort || 0]}</span>
                    </>
                  )}
                </div>
              </Table.ColumnHeaderCell>
            );
          })}
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeader;
