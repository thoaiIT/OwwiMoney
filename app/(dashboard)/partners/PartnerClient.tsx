'use client';
import { deletePartner } from '@/actions/controller/partnerController';
import { CommonButton } from '@/components/button';
import ConfirmDialog from '@/components/dialog/confirmDialog';
import CommonInput from '@/components/input';
import CommonTable from '@/components/table/CommonTable';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import useDebounce from '@/helper/hooks/useDebounce';
import type { Partner } from '@prisma/client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

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
  const [query, setQuery] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string>('');
  const tableData: UseTableDataResult = useTableData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const editHandler = (id: string) => {
    router.push(`/partners/${id}/edit`);
  };

  const deleteConfirmHandler = async () => {
    const response = await deletePartner(deleteId);
    if (response.status?.code === 200) {
      router.prefetch('/partners');
      router.push('/partners');
    }
  };

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);
  const callQuery = () => {
    const currenQuery = queryString.parse(searchParams.toString());
    const updatedQuery = { ...currenQuery, query, page: 1 };
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  useDebounce(callQuery, 500, query);

  return (
    <div className="mb-2">
      <ConfirmDialog
        open={!!deleteId}
        titleDialog="Confirm"
        customTextFooterButton="Confirm"
        handleSubmit={() => deleteConfirmHandler()}
        handleClose={() => {
          setDeleteId('');
        }}
        useCustomTrigger={<></>}
      >
        Are you sure you want to delete this wallet?
      </ConfirmDialog>
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
            className="border-none hover:border-none outline-none shadow-none w-96"
            intent="simple"
            placeholder="Search by name, email, address or description..."
            value={query}
            onChange={(event) => {
              setQuery((prev) => event.target.value);
            }}
          />
        </div>
        <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
          <Link
            href={'/partners/create'}
            className="flex items-center gap-2 w-full h-full justify-center"
          >
            <FaPlus />
            Add Partner
          </Link>
        </CommonButton>
      </div>
      {partners && (
        <CommonTable
          data={partners}
          tableData={tableData}
          columns={[
            {
              label: 'Image',
              field: 'image',
              customRender: (row: string) => {
                if (row) {
                  return (
                    <div className="py-1">
                      <Image
                        src={row}
                        alt={row}
                        width={32}
                        height={32}
                      />
                    </div>
                  );
                }
                return <></>;
              },
            },
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
          editHandler={editHandler}
          deleteHandler={(id: string) => {
            setDeleteId(id);
          }}
        />
      )}
    </div>
  );
}
