'use client';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import type { Transaction } from '@prisma/client';
import { useEffect } from 'react';

type TableTransactionAllProps = {
  dataTable: TransactionResType[];
  totalPages?: number;
};

export type TransactionResType = Omit<Transaction, 'createdAt' | 'updatedAt' | 'createdDate'> & {
  type: {
    id: string;
    name: string;
    description: string | null;
  };
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  partner: {
    id: string;
    name: string;
    description: string | null;
  };
  typeName: string;
  categoryName: string;
  partnerName: string;
  walletName: string;
  wallet: {
    id: string;
    name: string;
    description: string | null;
  };
  createdDate: string;
};

export const TableTransactionAll: React.FC<TableTransactionAllProps> = ({ dataTable, totalPages }) => {
  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const deleteHandler = (id: string) => {
    console.log('My custom delete ' + id);
  };

  const columns: ColumnType<TransactionResType>[] = [
    { label: 'Category', field: 'categoryName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partnerName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'typeName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'walletName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'left', textAlign: 'left' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const tableData: UseTableDataResult = useTableData();

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);
  return (
    <CommonTable
      data={dataTable}
      tableData={tableData}
      columns={columns}
      keyField={'id'}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
      useRowNumber
      usePagination
      customBorderStyle="rounded-tl-none rounded-tr-none"
    />
  );
};
