'use client';
import { CommonCard } from '@/components/card';
import TableBody from '@/components/table/TableBody';
import type { TableActionProps } from '@/components/table/TableBodyCell';
import TableFooter from '@/components/table/TableFooter';
import TableHeader, { type ColumnType } from '@/components/table/TableHeader';
import TablePagination from '@/components/table/TablePagination';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import { Table } from '@radix-ui/themes';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TableProps<T> = {
  data: T[];
  tableData?: UseTableDataResult;
  columns: ColumnType<T>[];
  keyField: keyof T;
  useCheckbox?: boolean;
  useRowNumber?: boolean;
  showFooterTotal?: boolean;
  showFooterAvg?: boolean;
};

const CommonTable = <TData,>({
  data,
  tableData,
  columns,
  keyField,
  useCheckbox,
  useRowNumber,
  showFooterTotal,
  showFooterAvg,
  editHandler,
  deleteHandler,
  customHandler,
}: TableProps<TData> & TableActionProps): JSX.Element => {
  const [dataRender, setDataRender] = useState<TData[]>(data);

  const selectAllRowHandler = (checked: boolean) => {
    if (checked) {
      tableData?.setSelectedKeys((prev) => {
        return data.map((item) => item[keyField] as string);
      });
    } else {
      tableData?.setSelectedKeys((prev) => []);
    }
  };

  const selectItemHandler = (checked: boolean, key: string) => {
    if (checked) {
      tableData?.setSelectedKeys((prev) => {
        const updated = [...prev];
        updated.push(key);
        return updated;
      });
    } else {
      tableData?.setSelectedKeys((prev) => {
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

    if (useRowNumber || showFooterAvg || showFooterTotal) {
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

  const insertNewRow = useCallback(() => {
    setDataRender((prev) => {
      const updated = [...prev.map((item) => ({ ...item }))];
      console.log({ dataKeys: Object.keys(data) });
      return updated;
    });
  }, []);

  useEffect(() => {
    tableData?.addCustomAction('insertNewRow', insertNewRow);
  }, [insertNewRow]);

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
          selectedKeys={tableData?.selectedKeys || ['']}
          selectHandler={selectItemHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          customHandler={customHandler}
        >
          <TableFooter
            columns={updatedColumns}
            data={dataRender}
            showTotal={showFooterTotal}
            showAvg={showFooterAvg}
          />
        </TableBody>
      </Table.Root>
      <TablePagination tableData={tableData} />
    </CommonCard>
  );
};

export default CommonTable;
