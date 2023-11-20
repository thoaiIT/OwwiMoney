'use client';

import { CommonButton } from '@/components/button';
import CommonInput from '@/components/input';
import Heading from '@/components/login/Heading';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

// Yup schema to validate the form
const schema = Yup.object().shape({
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

const NewPasswordForm = () => {
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
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (values) => {
    console.log(values);
    // await forgetPassword({ email: values.email }).then((result) => {
    //   if (result.status?.code === 200) {
    //     router.push(`/emailverification?email=${values.email}`);
    //   } else {
    //     toast.error(result.status?.message);
    //   }
    // });
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
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="Enter new password"
            value={value}
            onChange={onChange}
            type="password"
            placeholder="7 symbols at least"
            className="rounded-full border-gray-200 py-6 px-4 focus-visible:ring-none text-xl"
            errors={errors}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="Confirm password"
            value={value}
            onChange={onChange}
            type="password"
            placeholder="7 symbols at least"
            className="rounded-full border-gray-200 py-6 px-4 focus-visible:ring-none text-xl"
            errors={errors}
          />
        )}
      />

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
