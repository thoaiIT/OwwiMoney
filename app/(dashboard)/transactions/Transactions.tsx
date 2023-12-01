import { getAllTransactionByUser } from '@/actions/controller/transactionController';
import TabClient from '@/app/(dashboard)/transactions/TabClient';
import { TableTransactionAll, type TransactionResType } from '@/app/(dashboard)/transactions/TableClient';

type TransactionsProps = {
  page: number;
  pageSize: number;
};

const Transactions = async ({ page, pageSize }: TransactionsProps) => {
  const response = await getAllTransactionByUser(pageSize, page);
  const data: TransactionResType[] = response.data?.transactions || [];
  const totalPages: number = response.data?.totalPages || 0;
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
            <TableTransactionAll
              dataTable={data}
              totalPages={totalPages}
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
