import TabClient from '@/app/(dashboard)/transactions/TabClient';
import { TableTransactionAll, type TransactionTableType } from '@/app/(dashboard)/transactions/TableClient';

type TransactionsProps = {
  temp: string;
};

const data: TransactionTableType[] = [];

const Transactions: React.FC<TransactionsProps> = async () => {
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
          children: <TableTransactionAll dataTable={data} />,
        },
        { value: 'revenue', children: 'Revenue page' },
        { value: 'expenses', children: 'Expenses page' },
        { value: 'loan', children: 'Loan page' },
      ]}
    />
  );
};

export default Transactions;
