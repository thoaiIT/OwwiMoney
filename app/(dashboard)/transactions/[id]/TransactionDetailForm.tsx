'use client';
import { getCategoryByType } from '@/actions/controller/categoryController';
import { getPartnerByType } from '@/actions/controller/partnerController';
import {
  checkWalletInfo,
  updateTransaction,
  type TransactionUpdateType,
} from '@/actions/controller/transactionController';
import { getAllTypes } from '@/actions/controller/typeController';
import { getAllWallet } from '@/actions/controller/walletController';
import type { FileType, TransactionType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import CommonAvatar from '@/components/CommonAvatar';
import { CommonPopover, CommonPopoverContent, CommonPopoverTrigger } from '@/components/Popover';
import CommonTextarea from '@/components/Textarea';
import { CommonButton } from '@/components/button';
import { CommonCard } from '@/components/card';
import CommonCombobox, { OptionItem, type DataType } from '@/components/combobox';
import CommonDatePicker from '@/components/datepicker';
import CommonInput from '@/components/input';
import { tailwindMerge } from '@/utils/helper';
import { IsImage, MaxSize } from '@/utils/validate/decorators';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import * as Toggle from '@radix-ui/react-toggle';
import { IsNotEmpty, Min } from 'class-validator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';

type TransactionDetailFormType = {
  transaction: TransactionType;
};

export class UpdateTransactionModel {
  @IsNotEmpty({ message: 'Partner is required' })
  partnerId: string;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsNotEmpty({ message: 'Wallet is required' })
  wallet: string;

  @IsNotEmpty({ message: 'Created Date is required' })
  createdDate: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @Min(1, { message: 'Amount must be larger 0' })
  amount: number;

  status: 'PAID' | 'UNPAID';

  @IsImage()
  @MaxSize(10000000)
  invoiceImage?: FileType;

  description?: string;
}

const resolver = classValidatorResolver(UpdateTransactionModel);

const TransactionDetailForm = ({ transaction }: TransactionDetailFormType) => {
  const [typeOptions, setTypeOptions] = useState<DataType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<DataType[]>([]);
  const [partnerOptions, setPartnerOptions] = useState<DataType[]>([]);
  const [morePartnerOptions, setMorePartnerOptions] = useState<DataType[]>([]);
  const [walletOptions, setWalletOptions] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [transactionImage, setTransactionImage] = useState<string>(transaction?.invoiceImageUrl || '');

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    values: {
      partnerId: transaction?.partnerId || '',
      type: transaction?.typeId || '',
      category: transaction?.categoryId || '',
      wallet: transaction?.walletId || '',
      createdDate: transaction?.createdDate || '',
      amount: transaction?.amount || 0,
      invoiceImage: { base64String: '', size: 0, type: '' },
      status: transaction?.status || 'PAID',
      description: transaction?.description || '',
    },
    resolver,
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target?.result;

        setTransactionImage(base64String?.toString() || '');
        // onChange({ base64String: base64String as string, size: file.size, type: file.type });
        setValue('invoiceImage', { base64String: base64String as string, size: file.size, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (searchString: string) => {
    setMorePartnerOptions(
      partnerOptions.slice(6).filter((option) => option.label.toLowerCase().includes(searchString.toLowerCase())),
    );
  };

  const handleSelectItem = (item: DataType) => {
    setPartnerOptions((prev) => {
      prev.splice(prev.indexOf(item), 1);
      const items = [item, ...prev];
      return items;
    });
    setValue('partnerId', item.value);
    setOpen(false);
  };

  const handleSubmitForm = handleSubmit(async (values) => {
    const amountChange = values.amount - transaction.amount;
    const amount = typeOptions.some(
      (type) => type.value === values.type && (type.label === 'Loan' || type.label === 'Outcome'),
    )
      ? -amountChange
      : amountChange;
    const walletInfo = await checkWalletInfo(values.wallet as string, amount);
    if (walletInfo.status?.code === 200) {
      // const isUnPaid = typeOptions.some(
      //   (type) => type.value === values.type && (type.label === 'Loan' || type.label === 'Borrow'),
      // );

      const data: TransactionUpdateType = {
        id: transaction.id,
        amount: Number(values.amount),
        categoryId: values.category,
        createdDate: (values.createdDate as { endDate?: string }).endDate as string,
        description: values.description || '',
        invoiceImageUrl: values.invoiceImage?.base64String || '',
        partnerId: values.partnerId,
        typeId: values.type,
        walletId: values.wallet,
        status: values.status,
      };
      console.log({ data });
      // setIsLoading(true);
      const res = await updateTransaction(data);
      // setIsLoading(false);
      if (res.status?.code === 200) {
        toast.success(res.message as string);
        router.refresh();
      } else {
        toast.error(res.message as string);
      }
    } else {
      toast.info(walletInfo.message);
    }
  });

  useEffect(() => {
    setMorePartnerOptions(partnerOptions.slice(6));
  }, [partnerOptions]);

  useEffect(() => {
    const fetchAllTypes = async () => {
      const allTypes = await getAllTypes();
      const typeOptions: DataType[] | undefined = allTypes.data?.types?.map((type) => {
        return { value: type.id, label: type.name } as DataType;
      });

      setTypeOptions(typeOptions as DataType[]);
    };
    const fetchAllWallet = async () => {
      const allWallets = await getAllWallet();
      const walletOptions: DataType[] | undefined = allWallets.data?.wallets?.map((wallet) => {
        return { value: wallet.id, label: wallet.name } as DataType;
      });
      setWalletOptions(walletOptions as DataType[]);
    };
    fetchAllTypes();
    fetchAllWallet();
  }, []);

  useEffect(() => {
    const fetchCategoriesByType = async () => {
      const category = await getCategoryByType(watch('type'));
      const categoryOpts: DataType[] | undefined = category.data?.categories?.map((category) => {
        return { value: category.id, label: category.name } as DataType;
      });
      setCategoryOptions(categoryOpts as DataType[]);
    };
    const fetchPartnersByType = async () => {
      const allPartners = await getPartnerByType(watch('type'));
      const partnerOpts: DataType[] | undefined = allPartners.data?.partners?.map((partner) => {
        return { value: partner.id, label: partner.name, src: partner.image } as DataType;
      });
      const selectedIndex = partnerOpts?.findIndex((p) => p.value === transaction.partnerId);
      const selectedItem = partnerOpts?.splice(selectedIndex || 0, 1) as DataType[];
      setPartnerOptions([...selectedItem, ...(partnerOpts as DataType[])]);
    };
    if (watch('type')) {
      fetchPartnersByType();
      fetchCategoriesByType();
    }
  }, [watch('type')]);

  return (
    <CommonCard className="p-4 md:p-16 md:pr-20 lg:pr-40 2xl:pr-96 w-full">
      <div className="grid grid-cols-3 gap-4 items-center">
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Created Date</p>
        <Controller
          name="createdDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonDatePicker
              asSingle
              name="createdDate"
              value={value}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <br />
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Type</p>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="type"
              valueProp={value}
              onChangeHandler={onChange}
              optionsProp={typeOptions as DataType[]}
              widthSelection={'100%'}
              placeholder={'Select Type...'}
              className="col-span-1"
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Partner</p>
        {partnerOptions.length === 0 ? (
          <div className="h-[84px] flex justify-start items-center text-base col-span-2">
            {watch('type') ? 'No Partner' : 'Please select type!!'}
          </div>
        ) : (
          <div className="flex gap-5 col-span-2">
            {partnerOptions.map((item, index: number) => {
              if (partnerOptions.length === 7 || index < 6) {
                return (
                  <CommonAvatar
                    handleClick={() => {
                      setValue('partnerId', item.value);
                    }}
                    src={item.src}
                    key={item.value}
                    label={item.label}
                    className={tailwindMerge(watch('partnerId') === item.value && 'border-2 border-black')}
                    customLabel={tailwindMerge(watch('partnerId') === item.value && 'font-bold')}
                  />
                );
              }
            })}
            {partnerOptions.length > 7 && (
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
                  <div className="h-min max-h-60 overflow-y-auto border-t-2">
                    {morePartnerOptions.map((option) => {
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
        )}

        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Category</p>
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="category"
              valueProp={value}
              onChangeHandler={onChange}
              optionsProp={categoryOptions as DataType[]}
              widthSelection={'100%'}
              placeholder={'Select Type...'}
              maxVisibleItems={4}
              className="col-span-1"
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Wallet</p>
        <Controller
          name="wallet"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="wallet"
              valueProp={value}
              onChangeHandler={onChange}
              optionsProp={walletOptions as DataType[]}
              widthSelection={'100%'}
              placeholder={'Select Wallet...'}
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Amounts</p>
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="amount"
              type="number"
              minValue={1}
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
              placeholder="0"
              value={value}
              onChange={(e) => {
                onChange(e.target.value === '' ? '' : Number(e.target.value));
              }}
              errors={errors}
            />
          )}
        />
        <br />
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Invoice Image</p>
        <div className="col-span-2">
          <input
            type="file"
            id="upload-file"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
          {!transactionImage && (
            <label
              htmlFor="upload-file"
              className="inline-block px-2 py-2 bg-white text-slate-400 rounded-2xl text-center cursor-pointer border-2 border-dashed border-dark-mode hover:bg-slate-400 hover:text-white transition-all duration-300"
            >
              <FaCloudUploadAlt size="80" />{' '}
            </label>
          )}
          {transactionImage && (
            <label
              htmlFor="upload-file"
              className="relative inline-block w-[200px] h-[200px] bg-white text-slate-400 rounded-2xl overflow-hidden text-center cursor-pointer border-2 border-dashed border-dark-mode hover:bg-slate-400 hover:text-white transition-all duration-300"
            >
              <Image
                src={transactionImage}
                layout="fill"
                alt="partner image"
              />
            </label>
          )}
        </div>
        {(transaction.type === 'Borrow' || transaction.type === 'Loan') && (
          <>
            <p className="mb-2 text-base font-semibold leading-6 col-span-1">Status</p>
            <div className="col-span-2">
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Toggle.Root
                    aria-label="Toggle italic"
                    onClick={() => {
                      value === 'PAID' ? onChange('UNPAID') : onChange('PAID');
                    }}
                    className={tailwindMerge(
                      'justify-between inline-flex items-center rounded-md transition-colors px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus:border-dark-mode',
                      value === 'PAID' && 'text-color-success border-color-success focus:border-color-success',
                    )}
                  >
                    {value}
                  </Toggle.Root>
                )}
              />
            </div>
          </>
        )}
        <p className="mb-2 text-base font-semibold leading-6 col-span-1">Description</p>
        <div className="col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CommonTextarea
                name="description"
                className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0"
                placeholder="Description"
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-6 gap-4">
        <CommonButton
          className={`w-fit ${isLoading ? 'bg-white-300' : ''} `}
          intent={'outline'}
          onClick={() => {
            reset();
            setTransactionImage(transaction.invoiceImageUrl);
          }}
          disabled={isLoading}
        >
          Reset
        </CommonButton>
        <CommonButton
          className={`w-fit ${isLoading ? 'bg-white-300' : ''} `}
          onClick={handleSubmitForm}
          disabled={isLoading}
        >
          Update
        </CommonButton>
      </div>
    </CommonCard>
  );
};

export default TransactionDetailForm;
