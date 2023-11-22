'use client';
import TabClient from '@/app/(dashboard)/transactions/TabClient';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';

type TransactionsProps = {
  dataTable: any[];
};
const Transactions: React.FC<TransactionsProps> = ({ dataTable }) => {
  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const deleteHandler = (id: string) => {
    console.log('My custom delete ' + id);
  };

  const columns: ColumnType<any>[] = [
    { label: 'Email', field: 'email', sortable: true },
    { label: 'Full Name', field: 'fullName', sortable: false },
    { label: 'Order', field: 'order', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];
  return (
    <TabClient
      defaultValue="account"
      tabNames={[
        { value: 'account', label: 'Account' },
        { value: 'password', label: 'Password' },
        { value: 'email', label: 'Email' },
      ]}
      tabContents={[
        {
          value: 'account',
          children: (
            <CommonTable
              data={dataTable}
              columns={columns}
              keyField={'id'}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              useCheckbox
              useRowNumber
            />
          ),
        },
        { value: 'password', children: 'Password page' },
        { value: 'email', children: 'Email page' },
      ]}
    />
  );
};

export default Transactions;
