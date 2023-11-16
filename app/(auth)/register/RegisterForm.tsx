'use client';

import Link from 'next/link';
import Heading from '../../../components/login/Heading';

import { useState } from 'react';
import Input from '../../../components/login/input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../actions/user/registerUser';
import { useRouter } from 'next/navigation';
import type { ObjectWithDynamicKeys } from '../../../helper/type';
import { setCookies } from '../../../actions/cookies';
import { CommonButton } from '../../../components/button';

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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password, confirmPassword }: ObjectWithDynamicKeys<any>) => {
      // Make a request to your backend to store the data
      console.log({ email, password, confirmPassword });

      const result = await registerUser({
        email,
        password,
        name: email.split('@')[0] || 'user',
      });
      if (result?.body?.userId) {
        const id = result?.body?.userId;
        await setCookies('userId', id, true);
        Promise.all([setCookies('userId', id)]).then(() => {
          router.push('/verification?type=register');
        });
        // router.push(); //`/otp/register-user/${result?.body?.userId}`
      }
      console.log({ result });
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

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
      <Input
        id={'email'}
        label="Email"
        type="email"
        placeholder="username@gmail.com"
        onChange={handleChange}
        value={values.email}
        errors={errors.email as any}
        touched={touched.email as any}
        custom="xl:w-[70%] rounded-full"
      />
      <Input
        id={'password'}
        label="Password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={values.password}
        errors={errors.password as any}
        touched={touched.password as any}
        custom="xl:w-[70%] rounded-full"
      />
      <Input
        id={'confirmPassword'}
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        onChange={handleChange}
        value={values.confirmPassword}
        errors={errors.confirmPassword as any}
        touched={touched.confirmPassword as any}
        custom="xl:w-[70%] rounded-full"
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
        onClick={() => handleSubmit()}
      >
        {isLoading ? 'Loading' : 'Register'}
      </CommonButton>
    </>
  );
};

export default RegisterForm;
