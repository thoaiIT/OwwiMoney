'use client';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import type { Partner } from '@prisma/client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

export type DisplayPartner = Partner & { typeName: string };

export default function PartnerClient({
  partners,
  totalPages,
}: {
  page?: number;
  pageSize?: number;
  partners: DisplayPartner[];
  totalPages?: number;
}) {
  // const [partners, setPartners] = useState<DisplayPartner[]>([]);
  // const searchParams = useSearchParams();
  // const query = queryString.parse(searchParams.toString());
  const tableData: UseTableDataResult = useTableData();

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);

  console.log({ partners });

  return (
    <>
      <div
        key="search-partner-bar"
        className="flex justify-between bg-white-500 p-5 rounded-tl-2xl rounded-tr-2xl"
      >
        <div className="flex gap-2 items-center shadow-md px-4 rounded-lg">
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
      {partners && (
        <CommonTable
          data={partners}
          tableData={tableData}
          columns={[
            {
              label: 'Name',
              field: 'name',
              sortable: true,
            },
            {
              label: 'Type',
              field: 'typeName',
              sortable: true,
              headerTextAlign: 'center',
              textAlign: 'center',
            },
            { label: 'Email', field: 'email', sortable: true },
            { label: 'Address', field: 'address', sortable: true },
            { label: 'Contact', field: 'contact', sortable: true },
            { label: 'Description', field: 'description', sortable: true },
            { label: 'Actions', field: 'id', type: 'action' },
          ]}
          keyField={'id'}
          useRowNumber
          usePagination
          customBorderStyle="rounded-tl-none rounded-tr-none"
        />
      )}
    </>
  );
}
