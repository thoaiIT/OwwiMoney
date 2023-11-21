'use client';
import CommonTable from '@/components/table/CommonTable';

export default function Client() {
  const data = [
    { id: '1111', email: 'mail1@gmail.com', fullName: 'User0001 0001', order: '2' },
    { id: '1112', email: 'mail2 @gmail.com', fullName: 'User0003 0003', order: '5' },
    { id: '1113', email: 'mail1@gmail.com', fullName: 'User0002 0002', order: '3' },
    { id: '1114', email: 'mail4@gmail.com', fullName: 'User0004 0004', order: '0' },
  ];

  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const deleteHandler = (id: string) => {
    console.log('My custom delete ' + id);
  };

  return (
    <div className="flex justify-center mt-1">
      <CommonTable
        data={data}
        columns={[
          { label: 'Email', field: 'email', sortable: true },
          { label: 'Full Name', field: 'fullName', sortable: false },
          { label: 'Order', field: 'order', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
          { label: 'Actions', field: 'id', type: 'action' },
        ]}
        keyField={'id'}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        useCheckbox
        useRowNumber
      />
    </div>
  );
}
