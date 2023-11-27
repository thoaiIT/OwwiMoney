'use client';
import TabClient from '@/app/(dashboard)/transactions/TabClient';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { Transaction } from '@prisma/client';

export type TransactionTableType = Omit<Transaction, 'createdAt' | 'updatedAt'> & {
  category: string;
  partner: string;
  type: string;
  wallet: string;
};

type TransactionsProps = {
  dataTable: TransactionTableType[];
};
const Transactions: React.FC<TransactionsProps> = ({ dataTable }) => {
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
    <TabClient
      defaultValue="all"
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
              data={dataTable}
              columns={columns}
              keyField={'id'}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              useRowNumber
            />
          ),
        },
        { value: 'revenue', children: 'Revenue page' },
        { value: 'expenses', children: 'Expenses page' },
        { value: 'loan', children: 'Loan page' },
      ]}
    />
  );
};

export default Transactions;
