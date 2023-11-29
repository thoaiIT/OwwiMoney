'use client';

import { createWallet, getAllWalletType } from '@/actions/controller/walletController';
import { CommonButton } from '@/components/button';
import CommonCombobox, { type DataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';

import { WalletModel } from '@/model/walletModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextArea } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface WalletDialogProps {
  handleRerender: () => void;
}

const resolver = classValidatorResolver(WalletModel);

const WalletDialog = ({ handleRerender }: WalletDialogProps) => {
  const [walletTypeOption, setWalletTypeOption] = useState<DataType[]>([{ label: '', value: '' }]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      walletName: '',
      walletType: '',
      accountNumber: '',
      totalAmount: '',
      description: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: WalletModel) => {
    const { accountNumber, walletType, description, totalAmount, walletName } = values;

    const data = {
      accountNumber: accountNumber as string,
      walletTypeId: (walletType as { value: string } | undefined)?.value || '',
      description: description as string,
      totalBalance: Number(totalAmount),
      name: walletName as string,
    };

    const result = await createWallet(data);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      handleRerender();
    } else {
      toast.error(result.message as string);
    }
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
          <CommonButton className="w-[208px] duration-300 transition-all bg-[#3F72AF] flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
            <FaPlus />
            Add wallet
          </CommonButton>
        }
        titleDialog="New Wallet"
        customStyleHeader="text-2xl"
        handleSubmit={handleSubmitForm}
        handleClose={() => {
          reset();
        }}
      >
        <p className={'text-base font-semibold mb-2'}>Wallet name</p>
        <Controller
          name="walletName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="walletName"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Wallet name"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />

        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet type</p>
        <Controller
          name="walletType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="walletType"
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
          name="totalAmount"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="totalAmount"
              value={value}
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
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Description</p>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              onChange={onChange}
              placeholder="Description"
              size={'3'}
              value={value}
              name="description"
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          )}
        />
      </DialogForm>
    </Box>
  );
};

export default WalletDialog;
