'use client';
import CommonTable from '@/components/table/CommonTable';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TbRestore } from 'react-icons/tb';

export default function Client() {
  const router = useRouter();
  const data = [
    { id: '1111', email: 'mail1@gmail.com', fullName: 'User0001 0001', order: '2' },
    { id: '1112', email: 'mail2 @gmail.com', fullName: 'User0003 0003', order: '5' },
    { id: '1113', email: 'mail1@gmail.com', fullName: 'User0002 0002', order: '3' },
    { id: '1114', email: 'mail4@gmail.com', fullName: 'User0004 0004', order: '100' },
  ];

  // const data = [];
  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
  };

  const deleteHandler = (id: string) => {
    console.log('My custom delete ' + id);
  };

  const tableData: UseTableDataResult = useTableData();

  const insertNewRowHandler = () => {
    tableData?.customAction?.insertNewRow?.();
  };

  const customRenderFullName = (name: string) => {
    return <span className="rounded-lg bg-white-400 px-2 hover:bg-white-500 transition-all duration-500">{name}</span>;
  };
  const customActionsRestore = (id: string) => {
    console.log('Custom actions: ' + id);
  };

  const customActionsHandler = (id: string) => {
    return (
      <div className="flex gap-2">
        <button
          className="flex justify-center items-center rounded-full w-10 h-10 bg-green-200 border-2 cursor-pointer"
          onClick={() => {
            customActionsRestore(id);
          }}
        >
          <TbRestore />
        </button>
        <button className="flex justify-center items-center rounded-full w-10 h-10 bg-red-200 border-2 cursor-pointer">
          <TrashIcon />
        </button>
      </div>
    );
  };

  // Change pagination total page
  useEffect(() => {
    tableData.changeTotalPage(10);
  }, []);

  return (
    <div className="flex justify-center mt-1">
      <button onClick={insertNewRowHandler}>Custom Actions</button>
      <CommonTable
        data={data}
        tableData={tableData}
        columns={[
          { label: 'Email', field: 'email', sortable: true, showFooterTotal: false },
          {
            label: 'Full Name',
            field: 'fullName',
            sortable: false,
            showFooterTotal: false,
            customRender: customRenderFullName,
          },
          {
            label: 'Order',
            field: 'order',
            sortable: true,
            headerTextAlign: 'center',
            textAlign: 'center',
            showFooterTotal: true,
          },
          { label: 'Actions', field: 'id', type: 'action', textAlign: 'center' },
        ]}
        customActionsHandler={customActionsHandler}
        keyField={'id'}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        useCheckbox
        useRowNumber
        showFooterTotal
        usePagination
        // showFooterAvg
      />
    </div>
  );
}
