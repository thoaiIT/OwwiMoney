'use Client';
import { CommonButton } from '@/components/button';
import CommonCombobox, { type dataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextArea } from '@radix-ui/themes';
import { IsNotEmpty } from 'class-validator';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const frameworks = [
  {
    value: 'cash',
    label: 'Cash',
  },
  {
    value: 'credit',
    label: 'Credit',
  },
  {
    value: 'debit',
    label: 'Debit',
  },
];

export class newTransactionsModel {
  @IsNotEmpty({ message: 'Type is required' })
  type: string | undefined;

  @IsNotEmpty({ message: 'Wallet is required' })
  wallet: string | undefined;

  @IsNotEmpty({ message: 'Amounts is required' })
  amounts: number | undefined;
}

const resolver = classValidatorResolver(newTransactionsModel);

const WalletDialog = () => {
  const [options, setOptions] = useState<dataType[]>(frameworks);
  const [open, setOpen] = useState<boolean>(false);
  const [partner, setPartner] = useState<dataType | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      type: '',
      wallet: '',
      amounts: 0,
    },
    resolver,
  });

  const appearPartner = frameworks.splice(4, 1);

  console.log({ appearPartner, frameworks });
  const handleSubmitForm = handleSubmit(async (values: newTransactionsModel) => {
    console.log({ values });
    reset();
  });

  const handleSearch = (searchString: string) => {
    setOptions(frameworks.filter((option) => option.label.toLowerCase().includes(searchString.toLowerCase())));
  };
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
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />

        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Account type</p>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="type"
              valueProp={value}
              onChange={onChange}
              optionsProp={frameworks}
              widthSelection={'100%'}
              placeholder={'Select framework...'}
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Account number</p>
        <Controller
          name="amounts"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
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
          name="amounts"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
              type="number"
              minValue="0"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Description</p>
        <Controller
          name="amounts"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              size={'3'}
              name="wallet"
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          )}
        />
      </DialogForm>
    </Box>
  );
};

export default WalletDialog;
