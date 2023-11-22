import { CommonButton } from '@/components/button';
import type { ColumnType } from '@/components/table/TableHeader';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import clsx from 'clsx';

export type TableActionProps = {
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  customHandler?: (id: string) => void;
  selectHandler?: (checked: boolean, key: string) => void;
};
export type TableBodyCellProps<T> = {
  keyField: keyof T;
  column: ColumnType<T>;
  row: T;
  order?: number;
  checkedRow?: boolean;
};

const TableBodyCell = <TData,>({
  column,
  row,
  keyField,
  order,
  checkedRow,
  selectHandler,
  editHandler,
  deleteHandler,
  customHandler,
}: TableActionProps & TableBodyCellProps<TData>) => {
  const editRowHandler = () => {
    if (editHandler) editHandler(row[keyField] as string);
    else console.log(`Edit record ${row[keyField]}`);
  };

  const deleteRowHandler = () => {
    if (deleteHandler) deleteHandler(row[keyField] as string);
    else console.log(`Delete record ${row[keyField]}`);
  };

  const customRowHandler = () => {
    if (editHandler) editHandler(row[keyField] as string);
    else console.log(`Custom record ${row[keyField]}`);
  };

  const selectRowHandler = (checked: Checkbox.CheckedState) => {
    selectHandler?.(!!checked, row[keyField] as string);
  };

  if (column.type === 'rowNumber') {
    return <Table.Cell className={clsx(['align-middle', `text-${column.textAlign}`])}>{Number(order) + 1}</Table.Cell>;
  }

  if (column.type === 'action') {
    return (
      <Table.Cell className={clsx(['flex gap-1 items-center justify-center', 'text-center'])}>
        <CommonButton
          className="p-0 rounded-full border-0 w-10 h-10 mb-1 mt-1 font-bold text-celestial_blue-500"
          intent={'outline'}
          onClick={editRowHandler}
        >
          <Pencil1Icon className="h-6 w-6" />
        </CommonButton>
        <CommonButton
          className="p-0 rounded-full border-0 w-10 h-10 mb-1 mt-1 text-danger"
          intent={'outline'}
          onClick={deleteRowHandler}
        >
          <TrashIcon className="h-6 w-6" />
        </CommonButton>
      </Table.Cell>
    );
  }

  if (column.type === 'checkbox') {
    return (
      <Table.Cell className="align-middle">
        <Checkbox.Root
          className={clsx([
            'shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[3px] bg-white outline-none border-2',
            column.textAlign === 'center' ? 'mx-auto' : '',
          ])}
          id="c1"
          defaultChecked={checkedRow}
          onCheckedChange={selectRowHandler}
        >
          <Checkbox.Indicator className="flex justify-center">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </Table.Cell>
    );
  }
  return (
    <Table.Cell className={clsx(['align-middle', `text-${column.textAlign}`])}>
      {row[column.field] as React.ReactNode}
    </Table.Cell>
  );
};

export default TableBodyCell;
