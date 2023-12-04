'use client';
import {
  deleteWallet,
  getWalletById,
  updateWallet,
  type WalletCreateType,
} from '@/actions/controller/walletController';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { CommonButton } from '@/components/button';
import { CardContent, CardFooter, CardHeader, CommonCard } from '@/components/card';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import DefaultWallet from '@/public/icons/default_wallet.png';
import type { Transaction } from '@prisma/client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type TransactionTableType = Omit<Transaction, 'createdAt' | 'updatedAt'> & {
  category: string;
  partner: string;
  type: string;
  wallet: string;
};

const WalletDetail = () => {
  const [wallet, setWallet] = useState<WalletModel>();
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const parts = pathName.split('/');
  const walletId = parts[parts.length - 1];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getWalletById(walletId as string);
      const newWallet = result.data?.wallet;
      if (newWallet) {
        setWallet(newWallet);
        setTriggerRerender(false);
      } else {
        router.replace('/notfound');
      }
      setIsLoading(false);
    })();
  }, [triggerRerender]);

  const columns: ColumnType<TransactionTableType>[] = [
    { label: 'Category', field: 'category', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partner', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'type', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'wallet', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'right', textAlign: 'right' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const handleUpdateWallet = async (data: WalletCreateType) => {
    if (walletId) {
      setIsLoading(true);
      const result = await updateWallet({ ...data, walletId });
      console.log(result);
      if (result.status?.code === 200) {
        toast.success(result.message as string);
        setTriggerRerender(true);
      } else {
        toast.error(result.message as string);
      }
      setIsLoading(false);
    }
  };

  const handleRemoveWallet = async () => {
    const result = await deleteWallet(walletId as string);
    if (result.status?.code === 200) {
      toast.success(result.message);
      router.replace('/wallet');
    } else {
      toast.error(result.message);
    }
  };

  if (!wallet || isLoading) return <Loading />;
  return (
    <>
      <Title title="Wallet detail" />
      <CommonCard className="w-full rounded-[28px]">
        <CardHeader />
        <CardContent>
          <div className="md:grid md:grid-cols-5 block">
            <div className="col-span-3">
              <div className="md:grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Wallet Name</p>
                  <p className="text-2xl font-semibold">{wallet?.name}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Wallet Type</p>
                  <p className="text-2xl font-semibold">{wallet.walletType?.typeName}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Balance</p>
                  <p className="text-2xl font-semibold">${wallet?.totalBalance}</p>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:mt-8 gap-4">
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Account Number</p>
                  <p className="text-2xl font-semibold">{wallet?.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold ">Wallet Color</p>
                  <p
                    className="text-2xl font-semibold"
                    style={{
                      color: `${wallet.color !== '#FFFFFF' ? wallet.color : '#000000'}`,
                    }}
                  >
                    {wallet?.color ? wallet.color : '#FFFFFF'}
                  </p>
                </div>
                {wallet.description && (
                  <div>
                    <p className="text-xl text-gray-03 font-semibold">Description</p>
                    <p className="text-2xl font-semibold">
                      {wallet.description.length > 20
                        ? wallet.description?.substring(0, 20) + '...'
                        : wallet.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <Image
                className="mx-auto"
                src={(wallet.walletImage as string) || DefaultWallet}
                alt={wallet.name}
                width={200}
                height={200}
                unoptimized
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-6 pb-8">
          <WalletDialog
            type="update"
            handleUpdateWallet={handleUpdateWallet}
            {...wallet}
          />
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
