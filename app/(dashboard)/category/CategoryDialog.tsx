'use client';

import { createCategory, type CategoryCreateType } from '@/actions/controller/categoryController';
import { getAllTypes } from '@/actions/controller/typeController';
import type { FileType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import CommonTextarea from '@/components/Textarea';
import { CommonButton } from '@/components/button';
import CommonCombobox, { type DataType } from '@/components/combobox';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import { CategoryModel, CategoryModelReceive } from '@/model/categoryModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@radix-ui/themes';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

interface CategoryDialogProps {
  type: string;
}

const resolver = classValidatorResolver(CategoryModel);

const CategoryDialog = ({ type }: CategoryDialogProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [changeImage, setChangeImage] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);
  const [categoryTypeOption, setCategoryTypeOption] = useState<DataType[]>([{ label: '', value: '' }]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      name: '',
      type: '',
      description: '',
      categoryImage: { base64String: '', size: 0, type: '' },
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: CategoryModelReceive) => {
    const data = {
      categoryImage: values.categoryImage?.base64String,
      name: values.name,
      typeId: values.type,
      description: values.description,
    };

    const result = await createCategory(data as CategoryCreateType);
    console.log(result);
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

  useEffect(() => {
    (async () => {
      const allTypes = await getAllTypes();
      const typeOptions: DataType[] | undefined = allTypes.data?.types?.map((type) => {
        return { value: type.id, label: type.name } as DataType;
      });

      setCategoryTypeOption(typeOptions as DataType[]);
    })();
  }, []);
  return (
    <Box>
      <DialogForm
        useCustomTrigger={
          <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
            <FaPlus />
            Add new Category
          </CommonButton>
        }
        titleDialog={type === 'create' ? 'New category' : 'Update category'}
        customStyleHeader="text-2xl"
        handleSubmit={handleSubmitForm}
        open={openDialog}
        handleOpenChange={() => {
          setOpenDialog(!openDialog);
        }}
        handleClose={() => {
          // setChangeImage(false);
          reset();
        }}
      >
        <div className="flex gap-2">
          <div className={`${type === 'create' ? 'w-full' : 'w-1/2'}`}>
            <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Wallet Image</p>
            {type === 'update' ? (
              <div className="flex gap-2 w-1/2 mb-2">
                <Image
                  src={''}
                  alt={''}
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
                name="categoryImage"
                control={control}
                render={({ field: { onChange } }) => (
                  <CommonInput
                    type="file"
                    name="categoryImage"
                    className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0 mb-6"
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
        </div>
        <p className={'text-base font-semibold mb-2'}>Category name</p>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="name"
              className="px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base focus-visible:ring-0 md:min-w-[500px] w-72"
              placeholder="Category name"
              value={String(value)}
              onChange={onChange}
              errors={errors}
            />
          )}
        />
        <p className={'mt-6 mb-2 text-base font-semibold leading-6 '}>Type</p>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonCombobox
              name="type"
              valueProp={value}
              onChange={onChange}
              optionsProp={categoryTypeOption}
              widthSelection={'100%'}
              placeholder={'Select category type...'}
              customInput={'px-6 py-4 border-[1px] border-solid border-[#D1D1D1] hover h-14 text-base'}
              errors={errors}
            />
          )}
        />
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

export default CategoryDialog;
