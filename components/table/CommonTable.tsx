'use client';
import { CommonCard } from '@/components/card';
import TableBody from '@/components/table/TableBody';
import type { TableActionProps } from '@/components/table/TableBodyCell';
import TableFooter from '@/components/table/TableFooter';
import TableHeader, { type ColumnType } from '@/components/table/TableHeader';
import TablePagination from '@/components/table/TablePagination';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import OwwiNoDataImg from '@/public/img/Owwi-NoData.png';
import { tailwindMerge } from '@/utils/helper';
import { Table } from '@radix-ui/themes';
import Image from 'next/image';
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
  usePagination?: boolean;
  customBorderStyle?: string;
};

/**
 * Common Table Component.
 *
 * @component
 *
 * @template T - The type of data items in the table.
 *
 * @param {T[]} data - The data used to display on the table.
 *
 * @param {UseTableDataResult} tableData - The React hook used to handle select rows and pagination.
 *
 * @param {ColumnType<T>[]} columns - An array defining the columns and their attributes.
 *
 * @param {keyof T} keyField - The unique key used to identify each row in the data.
 *
 * @param {boolean} useCheckbox - Determines whether to show a checkbox column in the table.
 *
 * @param {boolean} useRowNumber - Determines whether to show an order column in the table.
 *
 * @param {boolean} showFooterTotal - Determines whether to show a total in the table footer. If true, useRowNumber is automatically set to true.
 *
 * @param {boolean} showFooterAvg - Determines whether to show an average in the table footer. If true, useRowNumber is automatically set to true.
 *
 * @param {boolean} usePagination - Determines whether to show table pagination. Must have tableData if usePagination is true.
 *
 * @param {Function} editHandler - Function called when the edit button is clicked. Takes the keyField as a parameter.
 *
 * @param {Function} deleteHandler - Function called when the delete button is clicked. Takes the keyField as a parameter.
 *
 * @param {Function} customCellHandler - Function for custom cell rendering.
 *
 * @param {string} customBorderStyle - custom border for table. Ex: border, border radius padding.
 *
 * @returns {JSX.Element} The rendered table component.
 */

const CommonTable = <TData,>({
  data,
  tableData,
  columns,
  keyField,
  useCheckbox,
  useRowNumber,
  showFooterTotal,
  showFooterAvg,
  usePagination,
  customBorderStyle,
  editHandler,
  deleteHandler,
  customActionsHandler,
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
      return updated;
    });
  }, []);

  useEffect(() => {
    tableData?.addCustomAction('insertNewRow', insertNewRow);
  }, [insertNewRow]);

  useEffect(() => {
    setDataRender(data);
  }, [data]);

  return (
    <CommonCard className={tailwindMerge(['w-full p-4', customBorderStyle])}>
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
          customActionsHandler={customActionsHandler}
        >
          {!data.length && (
            <Table.Row>
              <Table.Cell colSpan={updatedColumns.length}>
                <div className="flex w-full justify-center">
                  <Image
                    src={OwwiNoDataImg}
                    width={200}
                    height={200}
                    alt="Logo"
                    // className="absolute -top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          )}
          {data.length >= 1 && (
            <TableFooter
              columns={updatedColumns}
              data={dataRender}
              showTotal={showFooterTotal}
              showAvg={showFooterAvg}
            />
          )}
        </TableBody>
      </Table.Root>
      {usePagination && <TablePagination tableData={tableData} />}
    </CommonCard>
  );
};

export default CommonTable;
