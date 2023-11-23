import type { ColumnType } from '@/components/table/TableHeader';
import { Table } from '@radix-ui/themes';
import clsx from 'clsx';
type Props<T> = {
  columns: ColumnType<T>[];
  data: T[];
  showTotal?: boolean;
  showAvg?: boolean;
};

const TableFooter = <TData,>({ columns, data, showTotal, showAvg }: Props<TData>) => {
  return (
    <>
      <Table.Row className="font-[600]">
        {showTotal &&
          columns.map((column, idx) => {
            if (idx === 0) return <Table.Cell className={clsx(['text-center', 'py-2'])}>Total</Table.Cell>;
            return (
              <Table.Cell
                key={`table-footer-total-${column.label}`}
                className={clsx([`text-${column.textAlign}`, 'py-2'])}
              >
                {column.showFooterTotal
                  ? data.reduce((acc, row) => acc + (Number(row[column.field]) ? Number(row[column.field]) : 0), 0)
                  : ''}
              </Table.Cell>
            );
          })}
      </Table.Row>
      <Table.Row className="font-[600]">
        {showAvg &&
          columns.map((column, idx) => {
            if (idx === 0) return <Table.Cell className={clsx(['text-center', 'py-2'])}>Average</Table.Cell>;
            return (
              <Table.Cell
                key={`table-footer-total-${column.label}`}
                className={clsx([`text-${column.textAlign}`, 'py-2'])}
              >
                {column.showFooterTotal
                  ? data
                      .reduce(
                        (acc, row) => acc + (Number(row[column.field]) ? Number(row[column.field]) : 0) / data.length,
                        0,
                      )
                      .toFixed(2)
                  : ''}
              </Table.Cell>
            );
          })}
      </Table.Row>
    </>
  );
};

export default TableFooter;
