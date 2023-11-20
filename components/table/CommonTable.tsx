import { CommonCard } from '@/components/card';
import { Table } from '@radix-ui/themes';
import { useState } from 'react';

type ColumnType<T> = {
  label: string;
  field: string;
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

const CommonTable = <TData,>({ data, columns }: TableProps<TData>): JSX.Element => {
  const [dataRender, setDataRender] = useState<TData[]>(data);
  const [sortState, setSortState] = useState(0);

  const sortHandler = (field: string) => {
    const nextSortState = sortState + 1 >= sortStates.length ? 0 : sortState + 1;
    setSortState(nextSortState);

    setDataRender((prevData) => {
      const updatedData = [...data.map((item) => ({ ...item }))];
      console.log({ type: sortStates[nextSortState] });
      if (sortStates[nextSortState] === 'desc')
        return updatedData.sort((a: any, b: any) => (b[field] < a[field] ? -1 : 1));
      if (sortStates[nextSortState] === 'asc')
        return updatedData.sort((a: any, b: any) => (b[field] > a[field] ? -1 : 1));
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
                    {column.label}
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
                        {(row as any)[column.field as string]}
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
