'use client';

import { RegisterModel } from '@/model/authModel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerUser } from '../../../actions/user/registerUser';
import { CommonButton } from '../../../components/button';
import CommonInput from '../../../components/input';
import Heading from '../../../components/login/Heading';

const resolver = classValidatorResolver(RegisterModel);

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (values: RegisterModel) => {
    setIsLoading(true);
    const { email, password } = values;

    const result = await registerUser({
      email: email || '',
      password: password || '',
      name: email?.split('@')[0] || 'user',
    });

    if (result?.body?.userId) {
      await signIn('credentials', { ...values, redirect: false }).then(async (callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success('Register successfully');
          router.replace('/dashboard');
          router.refresh();
        }
        if (callback?.error) {
          console.log(callback);
          console.log('error');
        }
      });
    } else {
      setIsLoading(false);
      toast.error(result.message as string);
    }
  });

  return (
    <>
      <Heading
        title="Hello!"
        custom="md:text-7xl text-5xl text-center xl:text-start items-starts"
      />
      <Heading
        title="Sign Up to Get Started"
        custom="text-4xl text-center xl:text-start font-light"
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="email"
            label="Email"
            value={value}
            onChange={onChange}
            placeholder="Username@gmail.com"
            className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base "
            errors={errors}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="password"
            label="Password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Password"
            className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base"
            errors={errors}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Confirm Password"
            className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base"
            errors={errors}
          />
        )}
      />

      <p className="text-sm flex items-center">
        Have an account yet?
        <Link
          href="/login"
          className="ml-1 text-dark-blue hover:text-blue-500"
        >
          Login here
        </Link>
      </p>
      <CommonButton
        intent={'secondary'}
        disabled={isLoading}
        onClick={handleSubmitForm}
      >
        {isLoading ? 'Loading...' : 'Register'}
      </CommonButton>
    </>
  );
};

export default RegisterForm;
