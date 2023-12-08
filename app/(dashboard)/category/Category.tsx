'use client';
import {
  createCategory,
  deleteCategory,
  updateCategory,
  type CategoryCreateType,
} from '@/actions/controller/categoryController';
import CategoryDialog from '@/app/(dashboard)/category/CategoryDialog';
import type { CategoryTableType } from '@/app/(dashboard)/category/page';
import ConfirmDialog from '@/components/dialog/confirmDialog';
import CommonInput from '@/components/input';
import Loading from '@/components/loading';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import useTableData, { type UseTableDataResult } from '@/components/table/hooks/useTableData';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryProps {
  dataTable: CategoryTableType[];
  totalPages: number;
}

const Category = ({ dataTable, totalPages }: CategoryProps) => {
  const router = useRouter();
  const tableData: UseTableDataResult = useTableData();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string>();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [query, setQuery] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const columns: ColumnType<CategoryTableType>[] = [
    {
      label: 'Image',
      field: 'categoryImage',
      customRender: (row) => {
        return (
          <Image
            src={row || 'https://cdn-icons-png.flaticon.com/512/1864/1864521.png'}
            alt="image"
            width={40}
            height={40}
            unoptimized
          />
        );
      },
      textAlign: 'center',
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
    },
    {
      label: 'Description',
      field: 'description',
      sortable: true,
      customRender: (row) => {
        return row && row.length > 32 ? row.substring(0, 32) + '...' : row;
      },
    },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const handleCreateCategory = async (value: CategoryCreateType) => {
    setIsLoading(true);
    const result = await createCategory(value as CategoryCreateType);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      router.refresh();
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  };

  const handleUpdateCategory = async (value: CategoryCreateType, isNewImage: boolean) => {
    if (categoryId) {
      setIsLoading(true);
      const result = await updateCategory({ ...value, categoryId }, isNewImage);
      if (result.status?.code === 200) {
        toast.success(result.message as string);
        setOpenEditDialog(false);
        router.refresh();
      } else {
        toast.error(result.message as string);
      }
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setIsLoading(true);
    if (categoryId) {
      const result = await deleteCategory(categoryId as string);
      if (result.status?.code === 200) {
        toast.success(result.message as string);
        router.refresh();
      } else {
        toast.error(result.message as string);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);

  useEffect(() => {
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
  }, [query]);

  return (
    <>
      {isLoading && <Loading />}
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
            placeholder="Search by name, type"
            value={query}
            onChange={(event) => {
              setQuery((prev) => event.target.value);
            }}
          />
        </div>
        <div>
          <CategoryDialog
            type="create"
            handleCreateCategory={handleCreateCategory}
            openDialog={openCreateDialog}
            handleOpenChange={() => {
              setOpenCreateDialog(!openCreateDialog);
            }}
            handleCloseDialog={() => {
              setOpenCreateDialog(false);
            }}
          />
        </div>
      </div>
      {dataTable && (
        <CommonTable
          data={dataTable}
          tableData={tableData}
          columns={columns}
          keyField={'id'}
          useRowNumber
          usePagination
          customBorderStyle="rounded-tl-none rounded-tr-none"
          editHandler={(id) => {
            setCategoryId(id);
            setOpenEditDialog(true);
          }}
          deleteHandler={(id) => {
            setCategoryId(id);
            setOpenConfirmDialog(true);
          }}
        />
      )}
      <ConfirmDialog
        useCustomTrigger={<></>}
        open={openConfirmDialog}
        titleDialog="Confirm"
        customTextFooterButton="Confirm"
        handleSubmit={handleDeleteCategory}
        handleOpenChange={() => {
          setOpenConfirmDialog(!openConfirmDialog);
        }}
      >
        Are you sure you want to delete this wallet?
      </ConfirmDialog>
      <CategoryDialog
        openDialog={openEditDialog}
        type="update"
        categoryId={categoryId}
        handleUpdateCategory={handleUpdateCategory}
        handleOpenChange={() => {
          setOpenEditDialog(!openEditDialog);
        }}
        handleCloseDialog={() => {
          setOpenEditDialog(false);
        }}
      />
    </>
  );
};

export default Category;
