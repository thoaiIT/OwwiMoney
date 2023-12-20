'use client';
import { getTransactionByType } from '@/actions/controller/statisticController';
import TabClient from '@/app/(dashboard)/settings/TabClient';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import { useEffect, useState } from 'react';

export interface TransactionData {
  name: string;
  createdDate: string;
  categoryName: string;
  amount: number;
  id: string;
}

export interface TransactionTableType {
  outcomeTable: TransactionData[];
  incomeTable: TransactionData[];
  loanTable: TransactionData[];
  allDataTable: TransactionData[];
}

const TransactionTable = () => {
  const [transactionData, setTransactionDate] = useState<TransactionTableType>();
  useEffect(() => {
    (async () => {
      const [outcomeTable, incomeTable, loanTable, allDataTable] = await Promise.all([
        getTransactionByType('Outcome'),
        getTransactionByType('Income'),
        getTransactionByType('Loan'),
        getTransactionByType('All'),
      ]);

      setTransactionDate({
        outcomeTable: outcomeTable.data as TransactionData[],
        incomeTable: incomeTable.data as TransactionData[],
        loanTable: loanTable.data as TransactionData[],
        allDataTable: allDataTable.data as TransactionData[],
      });
    })();
  }, []);
  const tableData: UseTableDataResult = useTableData();
  const columns: ColumnType<TransactionData>[] = [
    {
      label: 'Partner',
      field: 'name',
      sortable: true,
      customRender: (row: string) => <div className="py-2 ">{row}</div>,
    },
    {
      label: 'Category',
      field: 'categoryName',
      sortable: true,
    },
    {
      label: 'Date',
      field: 'createdDate',
      sortable: true,
    },
    {
      label: 'Amount',
      field: 'amount',
      sortable: true,
      customRender: (row: string) => <div className="py-2 font-bold text-green-700">{row}</div>,
    },
  ];
  return (
    <TabClient
      defaultValue={'all'}
      tabNames={[
        { value: 'all', label: 'All' },
        { value: 'revenue', label: 'Revenue' },
        { value: 'expenses', label: 'Expenses' },
        { value: 'loan', label: 'Loan' },
      ]}
      tabContents={[
        {
          value: 'all',
          children: (
            <CommonTable
              data={transactionData?.allDataTable || []}
              tableData={tableData}
              columns={columns}
              keyField={'id'}
              customBorderStyle="border-none shadow-none p-0 "
            />
          ),
        },
        {
          value: 'revenue',
          children: (
            <CommonTable
              data={transactionData?.incomeTable || []}
              tableData={tableData}
              columns={columns}
              keyField={'id'}
              customBorderStyle="border-none shadow-none p-0"
            />
          ),
        },
        {
          value: 'expenses',
          children: (
            <CommonTable
              data={transactionData?.outcomeTable || []}
              tableData={tableData}
              columns={columns}
              keyField={'id'}
              customBorderStyle="border-none shadow-none p-0"
            />
          ),
        },
        {
          value: 'loan',
          children: (
            <CommonTable
              data={transactionData?.loanTable || []}
              tableData={tableData}
              columns={columns}
              keyField={'id'}
              customBorderStyle="border-none shadow-none p-0"
            />
          ),
        },
      ]}
    />
  );
};

export default TransactionTable;
