'use client';
import { deleteTransaction } from '@/actions/controller/transactionController';
import TransactionsDialog from '@/app/(dashboard)/transactions/TransactionsDialog';
import ConfirmDialog from '@/components/dialog/confirmDialog';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import useTableData from '@/components/table/hooks/useTableData';
import type { Transaction } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type TableTransactionAllProps = {
  dataTable: TransactionResType[];
  totalPages?: number;
};

export type TransactionResType = Omit<Transaction, 'createdAt' | 'updatedAt' | 'createdDate'> & {
  type: {
    id: string;
    name: string;
    description: string | null;
  };
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  partner: {
    id: string;
    name: string;
    description: string | null;
  };
  typeName: string;
  categoryName: string;
  partnerName: string;
  walletName: string;
  wallet: {
    id: string;
    name: string;
    description: string | null;
  };
  createdDate: string;
};

export const TableTransactionAll: React.FC<TableTransactionAllProps> = ({ dataTable, totalPages }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string>('');

  const router = useRouter();
  // const [deleteId, setDeleteId] = useState<string>('');
  const editHandler = (id: string) => {
    console.log('My custom edit ' + id);
    setEditId(id);
    setOpenDialog(true);
  };

  const handleDeleteTransaction = async () => {
    console.log('deleteTransactionId ' + deleteTransactionId);
    const result = await deleteTransaction(deleteTransactionId);
    if (result.status?.code === 200) {
      router.refresh();
      toast.success(result.message as string);
    } else {
      toast.error(result.message as string);
    }
  };

  const deleteHandler = async (id: string) => {
    console.log('My custom delete ' + id);
    setDeleteTransactionId(id);
    setOpenConfirmDialog(true);
  };

  const columns: ColumnType<TransactionResType>[] = [
    { label: 'Category', field: 'categoryName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partnerName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'typeName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'walletName', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'left', textAlign: 'left' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const tableData: UseTableDataResult = useTableData();

  useEffect(() => {
    tableData.changeTotalPage(totalPages || 0);
  }, [totalPages]);
  return (
    <Fragment>
      <Suspense fallback={''}>
        <TransactionsDialog
          transactionId={editId}
          formType="edit"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </Suspense>
      <CommonTable
        data={dataTable}
        tableData={tableData}
        columns={columns}
        keyField={'id'}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        useRowNumber
        usePagination
        customBorderStyle="rounded-tl-none rounded-tr-none"
      />
      <ConfirmDialog
        useCustomTrigger={<></>}
        open={openConfirmDialog}
        titleDialog="Confirm"
        customTextFooterButton="Confirm"
        handleSubmit={handleDeleteTransaction}
        handleOpenChange={() => {
          setOpenConfirmDialog(!openConfirmDialog);
        }}
      >
        Are you sure you want to delete this transaction?
      </ConfirmDialog>
    </Fragment>
  );
};
