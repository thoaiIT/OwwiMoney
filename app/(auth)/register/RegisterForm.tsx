'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { registerUser } from '../../../actions/user/registerUser';
import { CommonButton } from '../../../components/button';
import CommonInput from '../../../components/input';
import Heading from '../../../components/login/Heading';

interface RegisterModel {
  email: string;
  password: string;
  confirmPassword: string;
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required('No email provided').email(),
  password: Yup.string()
    .required('No password provided.')
    .min(7, 'Password is too short - should be 7 chars minimum.')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading] = useState(false);

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
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (values: RegisterModel) => {
    const { email, password } = values;
    const result = await registerUser({
      email,
      password,
      name: email.split('@')[0] || 'user',
    });
    if (result?.body?.userId) {
      router.push('/verification?type=register');
    }
    console.log({ result });
  });

  return (
    <>
      <Heading
        title="Hello!"
        custom="md:text-7xl text-5xl text-center xl:text-start items-starts"
      />
      <Heading
        title="Sign Up to Get Started"
        custom="text-3xl text-center xl:text-start font-light"
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
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            label="Confirm Password"
            type="password"
            value={value}
            onChange={onChange}
            placeholder="Confirm Password"
            className="xl:w-[70%] rounded-full border-gray-200 py-6 focus-visible:ring-none text-base"
            errors={errors.confirmPassword?.message}
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
        className="xl:w-[70%]"
        onClick={handleSubmitForm}
      >
        {isLoading ? 'Loading' : 'Register'}
      </CommonButton>
    </>
  );
};

export default RegisterForm;
