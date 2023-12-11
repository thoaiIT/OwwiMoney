'use Client';
import { getCategoryByType } from '@/actions/controller/categoryController';
import { getPartnerByType } from '@/actions/controller/partnerController';
import {
  checkWalletInfo,
  createTransaction,
  getTransactionById,
  type TransactionCreateType,
} from '@/actions/controller/transactionController';
import { getAllTypes } from '@/actions/controller/typeController';
import { getAllWallet } from '@/actions/controller/walletController';
import { CommonButton } from '@/components/button';
import CommonCombobox, { OptionItem, type DataType } from '@/components/combobox';
import CommonAvatar from '@/components/CommonAvatar';
import CommonDatePicker from '@/components/datepicker';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { CommonPopover, CommonPopoverContent, CommonPopoverTrigger } from '@/components/Popover';
import CommonTextarea from '@/components/Textarea';
import { tailwindMerge } from '@/utils/helper';
import { IsImage, MaxSize } from '@/utils/validate/decorators';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import { IsNotEmpty, Min } from 'class-validator';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';

export type FileType = {
  base64String: string;
  type: string;
  size: number;
};

export type TransactionsDialogProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formType?: 'create' | 'edit';
  transactionId?: string;
};

export type TransactionType = {
  id: string;
  createdDate: string;
  userId: string;
  partnerId: string;
  categoryId: string;
  typeId: string;
  walletId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  invoiceImageUrl: string;
};

export class NewTransactionModel {
  @IsNotEmpty({ message: 'Partner is required' })
  partnerId?: string;

  @IsNotEmpty({ message: 'Type is required' })
  type?: string;

  @IsNotEmpty({ message: 'Category is required' })
  category?: string;

  @IsNotEmpty({ message: 'Wallet is required' })
  wallet?: string;

  @IsNotEmpty({ message: 'Created Date is required' })
  createdDate?: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @Min(1, { message: 'Amount must be larger 0' })
  amount?: number;

  @IsImage()
  @MaxSize(10000000)
  invoiceImage?: FileType;

  description?: string;
}

const resolver = classValidatorResolver(NewTransactionModel);

const TransactionsDialog: React.FC<TransactionsDialogProps> = ({
  formType,
  openDialog,
  setOpenDialog,
  transactionId,
}) => {
  const [typeOptions, setTypeOptions] = useState<DataType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<DataType[]>([]);
  const [walletOptions, setWalletOptions] = useState<DataType[]>([]);
  const [partnerOptions, setPartnerOptions] = useState<DataType[]>([]);
  const [morePartnerOptions, setMorePartnerOptions] = useState<DataType[]>([]);
  const [transaction, setTransaction] = useState<TransactionType>();
  const [open, setOpen] = useState<boolean>(false);

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
      partnerId: '',
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
    const walletInfo = await checkWalletInfo(values.wallet as string, values.type as string, values.amount as number);
    if (walletInfo.status?.code === 200) {
      const data: TransactionCreateType = {
        amount: Number(values.amount),
        categoryId: values.category as string,
        createdDate: (values.createdDate as { endDate?: string }).endDate as string,
        description: values.description as string,
        invoiceImageUrl: values.invoiceImage?.base64String as string,
        partnerId: values.partnerId as string,
        typeId: values.type as string,
        walletId: values.wallet as string,
      };

      const res = await createTransaction(data);
      if (res.status?.code === 201) {
        toast.success(res.message as string);
        setOpenDialog(false);
        reset();
        setPartnerOptions([]);
        router.refresh();
      } else {
        toast.error(res.message as string);
      }
    } else {
      toast.info(walletInfo.message);
    }
  });

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
    if (openDialog) {
      fetchAllTypes();
      fetchAllWallet();
    }
  }, [openDialog]);

  useEffect(() => {
    setMorePartnerOptions(partnerOptions.slice(6));
  }, [partnerOptions]);

  useEffect(() => {
    const fetchCategoriesByType = async () => {
      console.log('fetchCategoriesByType');
      const category = await getCategoryByType(watch('type'));
      const categoryOpts: DataType[] | undefined = category.data?.categories?.map((category) => {
        return { value: category.id, label: category.name } as DataType;
      });
      setCategoryOptions(categoryOpts as DataType[]);
    };
    const fetchPartnersByType = async () => {
      const allPartners = await getPartnerByType(watch('type'));
      const partnerOpts: DataType[] | undefined = allPartners.data?.partners?.map((partner) => {
        return { value: partner.id, label: partner.name } as DataType;
      });
      setValue('partnerId', partnerOpts?.[0]?.value as string);
      setPartnerOptions(partnerOpts as DataType[]);
    };
    if (openDialog) {
      watch('type') && fetchPartnersByType();
      watch('type') && fetchCategoriesByType();
    }
  }, [watch('type'), openDialog]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await getTransactionById(transactionId as string);
      setTransaction(transaction.data as TransactionType);
    };
    if (transactionId && openDialog) fetchTransaction();
  }, [transactionId]);

  useEffect(() => {
    if (transaction) {
      setValue('type', transaction.typeId);
      setValue('category', transaction.categoryId);
    }
  }, [transaction, openDialog]);

  return (
    <Box>
      <DialogForm
        useCustomTrigger={
          formType === 'edit' ? (
            <></>
          ) : (
            <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
              <FaPlus />
              Add Transactions
            </CommonButton>
          )
        }
        titleDialog={formType === 'edit' ? 'Edit Transaction' : 'New Transaction'}
        customStyleHeader="text-2xl"
        open={openDialog}
        handleOpenChange={() => {
          setOpenDialog(!openDialog);
        }}
        handleSubmit={handleSubmitForm}
        handleClose={() => {
          reset();
          setPartnerOptions([]);
        }}
      >
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
                  maxVisibleItems={10}
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
        <p className={'mb-2 text-base font-semibold leading-6 '}>Partner</p>
        {partnerOptions.length === 0 ? (
          <div className="h-[60px] flex justify-center items-center text-base">
            {watch('type') ? 'No Partner' : 'Please select type!!'}
          </div>
        ) : (
          <div className="flex gap-5">
            {partnerOptions.map((item, index: number) => {
              if (partnerOptions.length === 7 || index < 6)
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
                  <div className="h-min max-h-96 overflow-y-auto border-t-2">
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
                <CommonDatePicker
                  asSingle
                  name="createdDate"
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
                placeholder="Description"
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
