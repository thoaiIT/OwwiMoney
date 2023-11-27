'use Client';
import CommonAvatar from '@/components/CommonAvatar';
import { CommonPopover, CommonPopoverContent, CommonPopoverTrigger } from '@/components/Popover';
import { CommonButton } from '@/components/button';
import CommonCombobox, { OptionItem, type dataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { tailwindMerge } from '@/utils/helper';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import { IsNotEmpty } from 'class-validator';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'js',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'HTML',
  },
  {
    value: 'css',
    label: 'CSS',
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

const TransactionsDialog = () => {
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
          <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
            <FaPlus />
            Add Transactions
          </CommonButton>
        }
        titleDialog="New Transactions"
        customStyleHeader="text-2xl"
        handleSubmit={handleSubmitForm}
        handleClose={() => {
          reset();
        }}
      >
        <p className={'mb-2 text-base font-semibold leading-6 '}>Partner</p>
        <div className="flex gap-5">
          {!!partner && (
            <CommonAvatar
              key={partner.value}
              label={partner.label}
              className={'border-2 border-black'}
              customLabel={'font-bold'}
            />
          )}
          {frameworks.map((item, index) => {
            if (index < 4 && item.value !== partner?.value)
              return (
                <CommonAvatar
                  handleClick={() => {
                    setPartner(item);
                  }}
                  key={item.value}
                  label={item.label}
                  className={tailwindMerge(partner?.value === item.value && 'border-2 border-black')}
                  customLabel={tailwindMerge(partner?.value === item.value && 'font-bold')}
                />
              );
          })}
          <CommonPopover
            open={open}
            onOpenChange={() => {
              setOpen(!open);
            }}
          >
            <CommonPopoverTrigger asChild>
              <div className="flex flex-col justify-center items-center">
                <CommonButton
                  intent={'outline'}
                  className="h-[60px] w-[60px] rounded-full"
                >
                  <GoPlus size={24} />
                </CommonButton>
                <p
                  className={
                    'text-base font-normal color-[#404040] w-[68px] text-ellipsis overflow-hidden whitespace-nowrap text-center'
                  }
                >
                  More...
                </p>
              </div>
            </CommonPopoverTrigger>
            <CommonPopoverContent>
              <div className="flex items-center">
                <BsSearch className="w-4 ml-3" />
                <CommonInput
                  name="search"
                  intent="simple"
                  placeholder="Search here... "
                  className="text-base"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </div>
              <div className="overflow-y-scroll border-t-2">
                {options.map((option) => (
                  <OptionItem
                    key={option.value}
                    item={option}
                    onSelect={(item) => {
                      setPartner(item);
                      setOpen(false);
                    }}
                    isActive={partner?.value === option.value}
                  />
                ))}
              </div>
            </CommonPopoverContent>
          </CommonPopover>
        </div>
        <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Type</p>
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
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet</p>
        <Controller
          name="wallet"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name={'wallet'}
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="Shopping"
              value={value}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Amounts</p>
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
      </DialogForm>
    </Box>
  );
};

export default TransactionsDialog;
