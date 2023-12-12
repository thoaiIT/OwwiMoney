'use client';

import { getAllWalletType, type WalletCreateType } from '@/actions/controller/walletController';
import type { FileType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import CommonTextarea from '@/components/Textarea';
import { CommonButton } from '@/components/button';
import CommonCombobox, { type DataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { WalletModelReceive, WalletModelUpload } from '@/model/walletModel';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';

interface WalletDialogProps {
  handleCreateWallet?: (data: WalletCreateType) => void;
  handleUpdateWallet?: (data: WalletCreateType, checkImage: boolean) => void;
  type?: string;
}

const resolver = classValidatorResolver(WalletModelReceive);

const WalletDialog = ({
  handleCreateWallet,
  handleUpdateWallet,
  type,
  accountNumber,
  name,
  totalBalance,
  walletTypeId,
  color,
  description,
  walletImage: walletImageUrl,
}: WalletDialogProps & Partial<WalletModelUpload>) => {
  const [walletTypeOption, setWalletTypeOption] = useState<DataType[]>([{ label: '', value: '' }]);
  const [changeImage, setChangeImage] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      name: name || '',
      walletTypeId,
      accountNumber: accountNumber || '',
      totalBalance: totalBalance || '',
      description,
      color,
      walletImage: { base64String: '', size: 0, type: '' },
    },
    resolver,
  });
  const handleChangeInvoiceImage = (e: ChangeEvent<HTMLInputElement>, onChange: (str: FileType) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target?.result;

        onChange({ base64String: base64String as string, size: file.size, type: file.type });
      };

      reader.readAsDataURL(file);
      setIsNewImage(true);
    }
  };

  const handleSubmitForm = handleSubmit(async (values: WalletModelReceive) => {
    const { accountNumber, walletTypeId, description, totalBalance, name, color, walletImage } = values;
    const data = {
      accountNumber: accountNumber as string,
      walletTypeId: walletTypeId as string,
      description: description as string,
      totalBalance: Number(totalBalance),
      name: name as string,
      color: color || '#FFFFFF',
      walletImage: walletImage?.base64String ? (walletImage?.base64String as string) : (walletImageUrl as string),
    };

    if (type === 'create' && handleCreateWallet) {
      handleCreateWallet(data);
      reset();
    }
    if (type === 'update' && handleUpdateWallet) handleUpdateWallet(data, isNewImage);

    setOpenDialog(false);
    setChangeImage(false);
    setIsNewImage(false);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllWalletType();
        if (result) {
          const walletType = result.data?.walletTypes.map((item) => ({ value: item.id, label: item.typeName }));
          setWalletTypeOption(walletType as DataType[]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <DialogForm
        useCustomTrigger={
          type === 'create' ? (
            <CommonButton className="w-[208px] duration-300 transition-all bg-[#3F72AF] flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
              <FaPlus />
              Add wallet
            </CommonButton>
          ) : (
            <CommonButton className="w-[148px] rounded-[4px] duration-300 transition-all bg-[#3F72AF] flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
              <span className="text-base ">Edit</span> <CiEdit />
            </CommonButton>
          )
        }
        titleDialog={type === 'create' ? 'New Wallet' : 'Update Wallet'}
        customStyleHeader="text-2xl"
        handleSubmit={handleSubmitForm}
        open={openDialog}
        handleOpenChange={() => {
          setOpenDialog(!openDialog);
        }}
        handleClose={() => {
          setChangeImage(false);
          reset();
        }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-2 md:min-w-[500px]">
          <div className="flex flex-col md:w-1/2 min-w-max">
            <p className={'text-base font-semibold mb-2'}>Wallet name</p>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonInput
                  name="name"
                  className="px-6  border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0 "
                  placeholder="Wallet name"
                  value={String(value)}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:w-1/2 min-w-max">
            <p className={'mb-2 text-base font-semibold leading-6 '}>Wallet type</p>
            <Controller
              name="walletTypeId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonCombobox
                  name="walletTypeId"
                  valueProp={value}
                  onChange={onChange}
                  optionsProp={walletTypeOption}
                  widthSelection={'100%'}
                  placeholder={'Select account type...'}
                  customInput={'px-6  border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
                  errors={errors}
                />
              )}
            />
          </div>
        </div>

        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Account number</p>
        <Controller
          name="accountNumber"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="accountNumber"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Account number"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Total amount</p>
        <Controller
          name="totalBalance"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="totalBalance"
              value={String(value)}
              placeholder="Total amount"
              onChange={(e) => {
                let numericValue = e.target.value.replace(/\D/g, '');
                numericValue = numericValue.length > 0 && numericValue[0] !== '0' ? numericValue : '';
                onChange(numericValue);
              }}
              type="text"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              errors={errors}
            />
          )}
        />

        <div className="flex gap-2">
          <div className={`${type === 'create' ? 'w-full' : 'w-1/2'}`}>
            <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet Image</p>
            {type === 'update' && walletImageUrl && !changeImage ? (
              <div className="flex gap-2 w-1/2">
                <Image
                  src={walletImageUrl}
                  alt={name as string}
                  width={42}
                  height={42}
                  unoptimized
                />
                <button
                  onClick={() => setChangeImage(true)}
                  className="hover:text-theme-component font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <Controller
                name="walletImage"
                control={control}
                render={({ field: { onChange } }) => (
                  <CommonInput
                    type="file"
                    name="walletImage"
                    className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                    placeholder="Shopping"
                    onChange={(e) => {
                      handleChangeInvoiceImage(e, onChange);
                    }}
                    errors={errors}
                  />
                )}
              />
            )}
          </div>
          {type === 'update' && (
            <div className="w-1/2">
              <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet color</p>
              <Controller
                name="color"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="color"
                    className="rounded-[4px] p-2 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0 w-full"
                    value={value as string}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          )}
        </div>

        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Description</p>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonTextarea
              name="description"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Description"
              value={value as string}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
      </DialogForm>
    </Box>
  );
};

export default WalletDialog;
