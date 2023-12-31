'use client';

import { forgetPassword } from '@/actions/controller/userController';
import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Heading from '@/components/login/Heading';
import { ForgotPasswordModel } from '@/model/authModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const resolver = classValidatorResolver(ForgotPasswordModel);

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsLoading(true);
    await forgetPassword({ email: values.email }).then((result) => {
      setIsLoading(false);
      if (result.status?.code === 200) {
        router.push(`/emailverification?email=${values.email}`);
      } else {
        toast.error(result.status?.message);
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
        title="Forgot Password"
        custom="text-4xl text-center xl:text-start text-dark-blue font-normal"
      />
      <p className="text-gray-400">
        Enter your email for the verification proccess,we will send 4 digits code <br /> to your email.
      </p>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="email"
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Enter email"
            className="  rounded-full border-gray-200 py-6 px-4 focus-visible:ring-none text-xl"
            errors={errors}
          />
        )}
      />
      <div className="flex">
        <p className="text-gray-400 mr-2">Return to login ?</p>
        <Link
          href="/login"
          className="text-dark-blue hover:text-blue-500"
        >
          Here
        </Link>
      </div>
      <CommonButton
        intent={'secondary'}
        className="py-6"
        onClick={handleSubmitForm}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Continue'}
      </CommonButton>
    </>
  );
};

export default ForgotPasswordForm;
