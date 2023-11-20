import { CommonButton } from '@/components/button';
import type { ColumnType } from '@/components/table/TableHeader';
import { Checkbox, Table } from '@radix-ui/themes';

type Props<T> = {
  columns: ColumnType<T>[];
  data: T[];
};

const TableBody = <TData,>({ columns, data }: Props<TData>) => {
  return (
    <Table.Body>
      {data &&
        data.map((row, i) => {
          return (
            <Table.Row key={`body-row-${i}-${new Date().getTime()}`}>
              {columns.map((column, idx) => {
                if (column.type === 'action') {
                  return (
                    <Table.Cell
                      key={`body-row-cell-${column.label}-${idx}`}
                      className="flex gap-1 mb-2"
                    >
                      <CommonButton className="rounded-lg">Edit</CommonButton>
                      <CommonButton className="rounded-lg">Delete</CommonButton>
                    </Table.Cell>
                  );
                }
                if (column.type === 'number') {
                  return (
                    <Table.Cell
                      key={`body-row-cell-${column.label}-${idx}`}
                      className="align-middle"
                    >
                      {i}
                    </Table.Cell>
                  );
                }
                if (column.type === 'checkbox') {
                  return (
                    <Table.Cell
                      key={`body-row-cell-${column.label}-${idx}`}
                      className="align-middle"
                    >
                      <Checkbox
                        size="3"
                        defaultChecked
                      />
                      <input type="checkbox" />
                    </Table.Cell>
                  );
                }
                return (
                  <Table.Cell
                    key={`body-row-cell-${column.label}-${idx}`}
                    className="align-middle"
                  >
                    {row[column.field] as React.ReactNode}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
    </Table.Body>
  );
};

export default TableBody;
