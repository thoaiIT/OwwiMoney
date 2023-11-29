'use Client';
import { getCategoryByType } from '@/actions/controller/categoryController';
import { getAllPartnerByUser } from '@/actions/controller/partnerController';
import { createTransaction, type TransactionCreateType } from '@/actions/controller/transactionController';
import { getAllTypes } from '@/actions/controller/typeController';
import { getAllWallets } from '@/actions/controller/walletController';
import { CommonButton } from '@/components/button';
import CommonCombobox, { OptionItem, type DataType } from '@/components/combobox';
import CommonAvatar from '@/components/CommonAvatar';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { CommonPopover, CommonPopoverContent, CommonPopoverTrigger } from '@/components/Popover';
import CommonTextarea from '@/components/Textarea';
import { tailwindMerge } from '@/utils/helper';
import { IsImage, MaxSize } from '@/utils/validate/decorators';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import { useEffect, useState, type ChangeEvent } from 'react';
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
    value: 'javascript',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'Html',
  },
  {
    value: 'css',
    label: 'CSS',
  },
  {
    value: 'java',
    label: 'Java',
  },
];

export type FileType = {
  base64String: string;
  type: string;
  size: number;
};

export class NewTransactionModel {
  // @IsNotEmpty({ message: 'Partner is required' })
  partnerId: string | undefined;

  // @IsNotEmpty({ message: 'Type is required' })
  type: string | undefined;

  // @IsNotEmpty({ message: 'Category is required' })
  category: string | undefined;

  // @IsNotEmpty({ message: 'Wallet is required' })
  wallet: string | undefined;

  // @IsNotEmpty({ message: 'Created Date is required' })
  createdDate: string | undefined;

  // @IsNotEmpty({ message: 'Amount is required' })
  amount: number | undefined;

  @IsImage()
  @MaxSize(10000000)
  invoiceImage: FileType | undefined;

  description: string | undefined;
}

const resolver = classValidatorResolver(NewTransactionModel);

const TransactionsDialog = () => {
  const [options, setOptions] = useState<DataType[]>(frameworks);
  const [typeOptions, setTypeOptions] = useState<DataType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<DataType[]>([]);
  const [walletOptions, setWalletOptions] = useState<DataType[]>([]);
  const [partnerOptions, setPartnerOptions] = useState<DataType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    values: {
      partnerId: frameworks[0]?.value,
      type: '',
      category: '',
      wallet: '',
      createdDate: '',
      amount: 0,
      invoiceImage: { base64String: '', size: 0, type: '' },
      description: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: NewTransactionModel) => {
    // const file = new File([''], values.invoiceImage);
    console.log({ values });
    const data: TransactionCreateType = {
      amount: values.amount as number,
      categoryId: values.category as string,
      createdDate: values.createdDate as string,
      description: values.createdDate as string,
      invoiceImageUrl: values.invoiceImage?.base64String as string,
      partnerId: values.partnerId as string,
      typeId: values.type as string,
      walletId: values.wallet as string,
    };

    await createTransaction(data);
    reset();
  });

  const handleSearch = (searchString: string) => {
    setOptions(frameworks.filter((option) => option.label.toLowerCase().includes(searchString.toLowerCase())));
  };

  const handleSelectItem = (item: DataType) => {
    setOptions((prev) => {
      prev.splice(prev.indexOf(item), 1);
      const items = [item, ...prev];
      return items;
    });
    setValue('partnerId', item.value);
    setOpen(false);
  };

  const handleChangeInvoiceImage = (e: ChangeEvent<HTMLInputElement>, onChange: (str: FileType) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target?.result;

        onChange({ base64String: base64String as string, size: file.size, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchAllPartners = async () => {
      const allPartners = await getAllPartnerByUser();
      const partnerOptions: DataType[] | undefined = allPartners.data?.partners?.map((partner) => {
        return { value: partner.id, label: partner.name } as DataType;
      });

      setPartnerOptions(partnerOptions as DataType[]);
    };
    const fetchAllTypes = async () => {
      const allTypes = await getAllTypes();
      const typeOptions: DataType[] | undefined = allTypes.data?.types?.map((type) => {
        return { value: type.id, label: type.name } as DataType;
      });

      setTypeOptions(typeOptions as DataType[]);
    };
    const fetchAllWallet = async () => {
      const allWallets = await getAllWallets();
      const walletOptions: DataType[] | undefined = allWallets.data?.types?.map((wallet) => {
        return { value: wallet.id, label: wallet.name } as DataType;
      });

      setWalletOptions(walletOptions as DataType[]);
    };
    fetchAllPartners();
    fetchAllTypes();
    fetchAllWallet();
  }, []);

  useEffect(() => {
    const fetchCategoryByType = async () => {
      const category = await getCategoryByType(watch('type'));
      const categoryOptions: DataType[] | undefined = category.data?.categories?.map((category) => {
        return { value: category.id, label: category.name } as DataType;
      });
      setCategoryOptions(categoryOptions as DataType[]);
    };
    watch('type') && fetchCategoryByType();
  }, [watch('type')]);

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
          {options.map((item, index) => {
            if (options.length === 7 || index < 6)
              return (
                <CommonAvatar
                  handleClick={() => {
                    setValue('partnerId', item.value);
                  }}
                  key={item.value}
                  label={item.label}
                  className={tailwindMerge(watch('partnerId') === item.value && 'border-2 border-black')}
                  customLabel={tailwindMerge(watch('partnerId') === item.value && 'font-bold')}
                />
              );
          })}
          {options.length > 7 && (
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
                <div className="h-min overflow-y-auto border-t-2">
                  {options.map((option, index) => {
                    if (index > 5)
                      return (
                        <OptionItem
                          key={option.value}
                          item={option}
                          onSelect={handleSelectItem}
                          isActive={watch('partnerId') === option.value}
                        />
                      );
                  })}
                </div>
              </CommonPopoverContent>
            </CommonPopover>
          )}
        </div>
        <div className="flex justify-between gap-2 min-w-[500px]">
          <div className="flex flex-col w-1/2 min-w-max">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Type</p>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonCombobox
                  name="type"
                  valueProp={value}
                  onChange={onChange}
                  optionsProp={typeOptions as DataType[]}
                  widthSelection={'100%'}
                  placeholder={'Select Type...'}
                  customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
                  errors={errors}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-1/2 min-w-max">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Category</p>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonCombobox
                  name="category"
                  valueProp={value}
                  onChange={onChange}
                  optionsProp={categoryOptions as DataType[]}
                  widthSelection={'100%'}
                  placeholder={'Select Category...'}
                  customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
                  errors={errors}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 min-w-[500px]">
          <div className="flex flex-col w-1/2 min-w-max">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Wallet</p>
            <Controller
              name="wallet"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonCombobox
                  name="wallet"
                  valueProp={value}
                  onChange={onChange}
                  optionsProp={walletOptions as DataType[]}
                  widthSelection={'100%'}
                  placeholder={'Select Wallet...'}
                  customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
                  errors={errors}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-1/2 min-w-max">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Created Date</p>
            <Controller
              name="createdDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonInput
                  type="date"
                  name="createdDate"
                  className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                  placeholder="Shopping"
                  value={value}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 min-w-[500px]">
          <div className="flex flex-col w-1/2 min-w-max">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Amounts</p>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CommonInput
                  name="amount"
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
          </div>
          <div className="flex flex-col w-1/2">
            <p className={'mt-6 mb-2 text-base font-semibold leading-6'}>Invoice Image</p>
            <Controller
              name="invoiceImage"
              control={control}
              render={({ field: { onChange } }) => (
                <CommonInput
                  type="file"
                  name="invoiceImage"
                  className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                  placeholder="Shopping"
                  onChange={(e) => {
                    handleChangeInvoiceImage(e, onChange);
                  }}
                  errors={errors}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Description</p>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonTextarea
                name="description"
                className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Shopping"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
      </DialogForm>
    </Box>
  );
};

export default TransactionsDialog;
