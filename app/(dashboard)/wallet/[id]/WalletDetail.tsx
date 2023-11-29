'use client';
import { deleteWallet, getWalletById, getWalletTypeName } from '@/actions/controller/walletController';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { CommonButton } from '@/components/button';
import { CardContent, CardFooter, CardHeader, CommonCard } from '@/components/card';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import type { Transaction } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'react-toastify';

interface WalletDetailProps {}

export type TransactionTableType = Omit<Transaction, 'createdAt' | 'updatedAt'> & {
  category: string;
  partner: string;
  type: string;
  wallet: string;
};

const WalletDetail = () => {
  const [wallet, setWallet] = useState<WalletModel>();
  const [walletTypeName, setWalletTypeName] = useState<string | undefined>('');
  const router = useRouter();
  const pathName = usePathname();
  const parts = pathName.split('/');
  const walletId = parts[parts.length - 1];

  useEffect(() => {
    (async () => {
      const result = await getWalletById(walletId as string);
      const newWallet = result.data?.wallet;

      if (newWallet) {
        setWallet(newWallet);
        const name = await getWalletTypeName(wallet?.walletTypeId as string);
        setWalletTypeName(name.data);
      } else {
        router.replace('/notfound');
      }
    })();
  }, []);

  const columns: ColumnType<TransactionTableType>[] = [
    { label: 'Category', field: 'category', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partner', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'type', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'wallet', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'right', textAlign: 'right' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const handleRemoveWallet = async () => {
    const result = await deleteWallet(walletId as string);
    if (result.status?.code === 200) {
      toast.success(result.message);
      router.replace('/wallet');
    } else {
      toast.error(result.message);
    }
  };

  if (!wallet) return <Loading />;
  return (
    <>
      <Title title="Wallet detail" />
      <CommonCard className="w-full rounded-[28px]">
        <CardHeader />
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-xl text-gray-03 font-semibold">Wallet Name</p>
              <p className="text-2xl font-semibold">{wallet?.name}</p>
            </div>
            <div>
              <p className="text-xl text-gray-03 font-semibold">Wallet Type</p>
              <p className="text-2xl font-semibold">{walletTypeName}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xl text-gray-03 font-semibold">Balance</p>
              <p className="text-2xl font-semibold">${wallet?.totalBalance}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 mt-8 gap-6">
            <div>
              <p className="text-xl text-gray-03 font-semibold">Account Number</p>
              <p className="text-2xl font-semibold">{wallet?.accountNumber}</p>
            </div>
            <div className="col-span-3">
              <p className="text-xl text-gray-03 font-semibold">Wallet Color</p>
              <p className="text-2xl font-semibold">{wallet?.color ? wallet.color : 'White'}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-6 pb-8">
          <CommonButton className="w-fit h-fit rounded-[4px] gap-2 px-10 bg-[#3F72AF]">
            <span className="text-base ">Save</span> <CiEdit />
          </CommonButton>
          <CommonButton
            className="bg-transparent hover:bg-transparent hover:ring-0 text-[#FF4F5B] w-fit p-0 hover:text-rose-400 font-semibold"
            onClick={handleRemoveWallet}
          >
            Remove
          </CommonButton>
        </CardFooter>
      </CommonCard>
      <Title title="Transition History" />
      <CommonTable
        data={[]}
        columns={columns}
        keyField={'id'}
        useRowNumber
      />
    </>
  );
};

export default WalletDetail;
