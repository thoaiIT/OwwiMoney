'use client';

import { getAllWalletType } from '@/actions/controller/walletController';
import CommonTextarea from '@/components/Textarea';
import { CommonButton } from '@/components/button';
import CommonCombobox, { type DataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';

import { WalletModel } from '@/model/walletModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';

interface WalletDialogProps {
  handleCreateWallet?: (data: WalletModel) => void;
  handleUpdateWallet?: (data: WalletModel) => void;
  type?: string;
}

const resolver = classValidatorResolver(WalletModel);

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
}: WalletDialogProps & Partial<WalletModel>) => {
  const [walletTypeOption, setWalletTypeOption] = useState<DataType[]>([{ label: '', value: '' }]);

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
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: WalletModel) => {
    const { accountNumber, walletTypeId, description, totalBalance, name, color } = values;
    const data = {
      accountNumber: accountNumber as string,
      walletTypeId: walletTypeId as string,
      description: description as string,
      totalBalance: Number(totalBalance),
      name: name as string,
      color: color || 'White',
    };

    if (type === 'create' && handleCreateWallet) handleCreateWallet(data);
    if (type === 'update' && handleUpdateWallet) handleUpdateWallet(data);

    reset();
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
        handleClose={() => {
          reset();
        }}
      >
        <p className={'text-base font-semibold mb-2'}>Wallet name</p>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="name"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0 md:w-96 w-72"
              placeholder="Wallet name"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />

        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet type</p>
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
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Account number</p>
        <Controller
          name="accountNumber"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="accountNumber"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
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
        {type === 'update' && (
          <>
            <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet color</p>
            <Controller
              name="color"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonTextarea
                  name="color"
                  className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                  placeholder="Description"
                  value={value as string}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
          </>
        )}
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
