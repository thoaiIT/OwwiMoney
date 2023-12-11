'use client';
import { changePasswordProfile } from '@/actions/controller/userController';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import { SecurityModel } from '@/model/SettingModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const resolver = classValidatorResolver(SecurityModel);
const SecurityForm = () => {
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
            className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px]"
            placeholder="Old Password"
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
            className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px] w-72"
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
            className="px-6 py-4 border-none shadow-none hover h-14 text-base focus-visible:ring-0 md:min-w-[500px] w-72"
            placeholder="Confirm password"
            value={String(value)}
            onChange={onChange}
            errors={errors}
            type="password"
          />
        )}
      />

      <CommonButton
        intent={'secondary'}
        onClick={handleSubmitForm}
        disabled={false}
        className="my-2 w-44 rounded-[4px] bg-theme-component hover:opacity-90 hover:bg-theme-component mt-6"
      >
        Update password
      </CommonButton>
    </div>
  );
};

export default SecurityForm;
