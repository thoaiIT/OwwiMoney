'use client';
import { deleteWallet, updateWallet, type WalletCreateType } from '@/actions/controller/walletController';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { CommonButton } from '@/components/button';
import { CardContent, CardFooter, CardHeader, CommonCard } from '@/components/card';
import Title from '@/components/dashboard/Title';
import ConfirmDialog from '@/components/dialog/confirmDialog';
import Loading from '@/components/loading';
import CommonTable from '@/components/table/CommonTable';
import type { ColumnType } from '@/components/table/TableHeader';
import DefaultWallet from '@/public/icons/default_wallet.png';
import type { Transaction } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export type TransactionTableType = Omit<Transaction, 'createdAt' | 'updatedAt'> & {
  category: string;
  partner: string;
  type: string;
  wallet: string;
};

const WalletDetail = ({ newWallet, walletId }: { newWallet: WalletModel; walletId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const columns: ColumnType<TransactionTableType>[] = [
    { label: 'Category', field: 'category', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Partner', field: 'partner', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Type', field: 'type', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Date', field: 'createdDate', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Wallet', field: 'wallet', sortable: true, headerTextAlign: 'center', textAlign: 'center' },
    { label: 'Amount', field: 'amount', sortable: true, headerTextAlign: 'right', textAlign: 'right' },
    { label: 'Actions', field: 'id', type: 'action' },
  ];

  const handleUpdateWallet = async (data: WalletCreateType, checkImage: boolean) => {
    if (walletId) {
      setIsLoading(true);
      const result = await updateWallet({ ...data, walletId }, checkImage);
      if (result.status?.code === 200) {
        router.refresh();
        toast.success(result.message as string);
      } else {
        toast.error(result.message as string);
      }
      setIsLoading(false);
    }
  };

  const handleRemoveWallet = async () => {
    setIsLoading(true);
    const result = await deleteWallet(walletId as string);
    if (result.status?.code === 200) {
      router.replace('/wallet');
      router.refresh();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;
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
                  <p className="text-2xl font-semibold">{newWallet?.name}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Wallet Type</p>
                  <p className="text-2xl font-semibold">{newWallet.walletType?.typeName}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Balance</p>
                  <p className="text-2xl font-semibold">${newWallet?.totalBalance}</p>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:mt-8 gap-4">
                <div>
                  <p className="text-xl text-gray-03 font-semibold">Account Number</p>
                  <p className="text-2xl font-semibold">{newWallet?.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xl text-gray-03 font-semibold ">Wallet Color</p>
                  <p
                    className="text-2xl font-semibold"
                    style={{
                      color: `${newWallet.color !== '#FFFFFF' ? newWallet.color : '#000000'}`,
                    }}
                  >
                    {newWallet?.color ? newWallet.color : '#FFFFFF'}
                  </p>
                </div>
                {newWallet.description && (
                  <div>
                    <p className="text-xl text-gray-03 font-semibold">Description</p>
                    <p className="text-2xl font-semibold">
                      {newWallet.description.length > 20
                        ? newWallet.description?.substring(0, 20) + '...'
                        : newWallet.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <Image
                className="mx-auto"
                src={(newWallet.walletImage as string) || DefaultWallet}
                alt={newWallet.name}
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
            {...newWallet}
          />
          <ConfirmDialog
            titleDialog="Confirm"
            customTextFooterButton="Confirm"
            handleSubmit={handleRemoveWallet}
            useCustomTrigger={
              <CommonButton className="w-fit font-bold text-[#FF4F5B] px-0  duration-300 transition-all bg-transparent hover:text-rose-500 hover:bg-transparent hover:transition-all hover:ring-0">
                Remove
              </CommonButton>
            }
          >
            Are you sure you want to delete this wallet?
          </ConfirmDialog>
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
