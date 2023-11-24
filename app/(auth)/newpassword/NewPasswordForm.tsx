'use client';

import { changePassword } from '@/actions/user/changePassword';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Heading from '@/components/login/Heading';
import { NewPasswordModel } from '@/model/authModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const resolver = classValidatorResolver(NewPasswordModel);

const NewPasswordForm = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      password: '',
      confirmPassword: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsLoading(true);
    await changePassword({ email, password: values.password }).then((result) => {
      setIsLoading(false);
      if (result.status?.code === 200) {
        toast.success(result.message);
        router.replace('/login');
      } else {
        toast.error(result.message);
      }
    });
  });
  return (
    <>
      <Heading
        title="OwwiMoney"
        custom="text-6xl text-center xl:text-start text-dark-blue"
      />
      <Heading
        title="New Password"
        custom="text-4xl text-center xl:text-start text-dark-blue font-normal"
      />
      <p className="text-gray-400">
        Set the new password for your account so you can login and access all <br /> featuress.
      </p>
      <div>
        <label htmlFor="password"> Enter new password</label>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="password"
              value={value}
              onChange={onChange}
              type="password"
              placeholder="9 symbols at least"
              className="rounded-full border-gray-200 py-6 px-4 focus-visible:ring-none text-xl mt-2"
              errors={errors}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="confirmPassword"
              value={value}
              onChange={onChange}
              type="password"
              placeholder="9 symbols at least"
              className="rounded-full border-gray-200 py-6 px-4 focus-visible:ring-none text-xl mt-2"
              errors={errors}
            />
          )}
        />
      </div>
      <CommonButton
        intent={'secondary'}
        className="py-6"
        onClick={handleSubmitForm}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'UPDATE PASSWORD'}
      </CommonButton>
    </>
  );
};

export default NewPasswordForm;
