import { getTransactionById } from '@/actions/controller/transactionController';
import type { TransactionType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import TransactionDetailForm from '@/app/(dashboard)/transactions/[id]/TransactionDetailForm';
import Title from '@/components/dashboard/Title';
import { Fragment } from 'react';

type TransactionDetailType = {
  id: string;
};

const TransactionDetail = async ({ id }: TransactionDetailType) => {
  const transactionRes = await getTransactionById(id);
  const transaction: TransactionType = transactionRes.data as TransactionType;
  return (
    <Fragment>
      <Title title="Transaction Detail" />
      <TransactionDetailForm transaction={transaction} />
    </Fragment>
  );
};

export default TransactionDetail;
