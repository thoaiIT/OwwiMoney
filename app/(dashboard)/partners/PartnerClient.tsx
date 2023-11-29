'use client';
import { getAllPartnerByUser } from '@/actions/controller/partnerController';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import type { Partner } from '@prisma/client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export default function PartnerClient() {
  const data = [
    { id: '1111', email: 'mail1@gmail.com', fullName: 'User0001 0001', order: '2' },
    { id: '1112', email: 'mail2 @gmail.com', fullName: 'User0003 0003', order: '5' },
    { id: '1113', email: 'mail1@gmail.com', fullName: 'User0002 0002', order: '3' },
    { id: '1114', email: 'mail4@gmail.com', fullName: 'User0004 0004', order: '100' },
  ];
  const [partners, setPartners] = useState<Partner[]>([]);

  const tableData: UseTableDataResult = useTableData();

  useEffect(() => {
    (async () => {
      const respone = await getAllPartnerByUser();
      // setPartners(respone.data?.partners);
    })();
  }, []);

  return (
    <>
      <div
        key="search-partner-bar"
        className="flex justify-between bg-white-500 p-3 rounded-2xl mb-2"
      >
        <div className="flex gap-2 items-center shadow-sm px-4 rounded-lg">
          <div>
            <MagnifyingGlassIcon />
          </div>
          <CommonInput
            name="searchKey"
            className="border-none hover:border-none outline-none shadow-none w-60"
            intent="simple"
          />
        </div>
        <div>
          <CommonButton>Add new Partner</CommonButton>
        </div>
      </div>
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
          },
          {
            label: 'Order',
            field: 'order',
            sortable: true,
            headerTextAlign: 'center',
            textAlign: 'center',
            showFooterTotal: true,
          },
          { label: 'Actions', field: 'id', type: 'action' },
        ]}
        keyField={'id'}
        useCheckbox
        useRowNumber
        showFooterTotal
        usePagination
        // showFooterAvg
      />
    </>
  );
}
