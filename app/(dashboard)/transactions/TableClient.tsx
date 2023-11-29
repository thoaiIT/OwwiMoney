'use client';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { Transaction } from '@prisma/client';

type TableTransactionAllProps = {
  dataTable: TransactionTableType[];
};

export type TransactionTableType = Omit<Transaction, 'createdAt' | 'updatedAt' | 'createdDate'> & {
  category: string;
  partner: string;
  type: string;
  wallet: string;
  createdDate: string;
};

export const TableTransactionAll: React.FC<TableTransactionAllProps> = ({ dataTable }) => {
  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const deleteHandler = (id: string) => {
    console.log('My custom delete ' + id);
  };

  const columns: ColumnType<TransactionTableType>[] = [
    { label: 'Category', field: 'category', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partner', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'type', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'wallet', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'right', textAlign: 'right' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];
  return (
    <CommonTable
      data={dataTable}
      columns={columns}
      keyField={'id'}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
      useRowNumber
    />
  );
};
