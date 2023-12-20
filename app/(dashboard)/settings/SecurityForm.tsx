'use client';
import { changePasswordProfile } from '@/actions/controller/userController';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Loading from '@/components/loading';
import { SecurityModel } from '@/model/SettingModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const resolver = classValidatorResolver(SecurityModel);
const SecurityForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver,
  });
  const handleSubmitForm = handleSubmit(async (values: SecurityModel) => {
    setIsLoading(true);
    const result = await changePasswordProfile({
      oldPassword: values.oldPassword as string,
      newPassword: values.newPassword as string,
    });
    if (result.status?.code === 200) {
      toast.success(result.message as string);
      reset();
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  });
  return (
    <div className="md:col-span-1 flex flex-col gap-4">
      <p className={'text-base font-semibold mb-2'}>Old password</p>
      <Controller
        name="oldPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="oldPassword"
            className="border-[1px] border-theme-component px-6 py-4  shadow-none hover h-14 text-base focus-visible:ring-0 bg-white md:w-96"
            placeholder="Old password"
            value={String(value)}
            onChange={onChange}
            errors={errors}
            type="password"
          />
        )}
      />
      <p className={'text-base font-semibold mb-2'}>New password</p>
      <Controller
        name="newPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="newPassword"
            className="border-[1px] border-theme-component px-6 py-4  shadow-none hover h-14 text-base focus-visible:ring-0 bg-white md:w-96"
            placeholder="New password"
            value={String(value)}
            onChange={onChange}
            errors={errors}
            type="password"
          />
        )}
      />
      <p className={'text-base font-semibold mb-2'}>Confirm password</p>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="confirmPassword"
            className="border-[1px] border-theme-component px-6 py-4  shadow-none hover h-14 text-base focus-visible:ring-0 bg-white md:w-96"
            placeholder="Confirm password"
            value={String(value)}
            onChange={onChange}
            errors={errors}
            type="password"
          />
        )}
      />
      <div className="flex items-center gap-2">
        <CommonButton
          intent={'secondary'}
          onClick={handleSubmitForm}
          disabled={isLoading}
          className="my-2 w-44 rounded-[4px] bg-theme-component hover:opacity-90 hover:bg-theme-component mt-2"
        >
          Update password
        </CommonButton>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default SecurityForm;
