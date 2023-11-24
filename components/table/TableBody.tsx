import type { TableActionProps } from '@/components/table/TableBodyCell';
import TableBodyCell from '@/components/table/TableBodyCell';
import type { ColumnType } from '@/components/table/TableHeader';

import { Table } from '@radix-ui/themes';

type Props<T> = {
  columns: ColumnType<T>[];
  data: T[];
  keyField: keyof T;
  selectedKeys: string[];
  children: React.ReactNode;
};

const TableBody = <TData,>({
  columns,
  data,
  keyField,
  selectedKeys,
  selectHandler,
  editHandler,
  deleteHandler,
  customHandler,
  children,
}: Props<TData> & TableActionProps) => {
  return (
    <Table.Body>
      {data &&
        data.map((row, i) => {
          return (
            <Table.Row
              key={`body-row-${i}-${new Date().getTime()}`}
              className={'transition-colors hover:bg-light-blue data-[state=selected]:bg-muted'}
            >
              {columns.map((column, idx) => {
                return (
                  <TableBodyCell
                    key={`body-row-cell-${column.label}-${idx}`}
                    column={column}
                    row={row}
                    keyField={keyField}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                    customHandler={customHandler}
                    selectHandler={selectHandler}
                    order={i}
                    checkedRow={selectedKeys.includes(row[keyField] as string)}
                  />
                );
              })}
            </Table.Row>
          );
        })}
      {children}
    </Table.Body>
  );
};

export default TableBody;
