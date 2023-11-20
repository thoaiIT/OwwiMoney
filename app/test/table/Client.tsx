'use client';
import CommonTable from '@/components/table/CommonTable';

export default function Client() {
  const data = [
    { id: '1111', email: 'mail1@gmail.com', fullName: 'User0001 0001' },
    { id: '1111', email: 'mail3@gmail.com', fullName: 'User0003 0003' },
    { id: '1111', email: 'mail2@gmail.com', fullName: 'User0002 0002' },
    { id: '1111', email: 'mail4@gmail.com', fullName: 'User0004 0004' },
  ];
  console.log({ data });
  return (
    <div className="flex justify-center mt-1">
      <CommonTable
        data={data}
        columns={[
          { label: 'Email', field: 'email', sortable: true },
          { label: 'Full Name', field: 'fullName', sortable: false },
        ]}
      />
    </div>
  );
}
