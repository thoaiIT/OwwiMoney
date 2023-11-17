'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { CommonButton } from '../../../components/button';
import CommonInput from '../../../components/input';
import Heading from '../../../components/login/Heading';
import FaceBookIcon from '../../../public/icons/facebook.svg';
import GitHubIcon from '../../../public/icons/github.svg';
import GoogleIcon from '../../../public/icons/google.svg';

interface LoginModel {
  email: string;
  password: string;
}

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required('No email provided').email(),
  password: Yup.string().required('No password provided.').min(7, 'Password is too short - should be 7 chars minimum.'),
});

const LoginForm = () => {
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
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (values: LoginModel) => {
    console.log(values);

    await signIn('credentials', { ...values, redirect: false }).then(async (callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        // console.log(callback);
        router.push('/dashboard');
        router.refresh();
      }
      if (callback?.error) {
        console.log(callback);
        console.log('error');
      }
    });
  });

  return (
    <>
      <Heading
        title="OwwiMoney"
        custom="md:text-7xl text-5xl text-center xl:text-start text-dark-blue"
      />
      <Heading
        title="Login"
        custom="mt-2 text-3xl text-center xl:text-start"
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            label="Email"
            value={value}
            onChange={onChange}
            placeholder="Username@gmail.com"
            className="xl:w-[70%] rounded-full border-gray-200 py-6 focus-visible:ring-none text-base "
            errors={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            label="Password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Password"
            className="xl:w-[70%] rounded-full border-gray-200 py-6 focus-visible:ring-none text-base"
            errors={errors.password?.message}
          />
        )}
      />
      <p className="text-sm">
        <Link
          className="text-dark-blue font-medium hover:text-blue-500"
          href="/forgetpassword"
        >
          Forget Password?
        </Link>
      </p>
      <CommonButton
        intent={'secondary'}
        className="xl:w-[70%]"
        onClick={handleSubmitForm}
      >
        {isLoading ? 'Loading' : 'Sign In'}
      </CommonButton>
      <div className="xl:w-[70%] mt-1">
        <p className="text-sm text-gray-400 text-center">or continue with</p>
      </div>
      <div className="xl:w-[70%] grid grid-cols-3 gap-2">
        <CommonButton
          intent={'outline'}
          onClick={() => ''}
        >
          <Image
            src={GoogleIcon}
            alt=""
          />
        </CommonButton>
        <CommonButton
          intent={'outline'}
          onClick={() => ''}
        >
          <Image
            src={GitHubIcon}
            alt=""
          />
        </CommonButton>
        <CommonButton
          intent={'outline'}
          onClick={() => ''}
        >
          <Image
            src={FaceBookIcon}
            alt=""
          />
        </CommonButton>
      </div>
      <div className="xl:w-[70%]">
        <p className="text-sm text-gray-400 text-center">
          Don&apos;t have an account yet?
          <Link
            href="/register"
            className="ml-1 text-dark-blue hover:text-blue-500"
          >
            Register for free
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
