'use client';

import { useState } from 'react';
import Link from 'next/link';
import Heading from '../../components/login/Heading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/login/input/Input';
import Button from '../../components/login/button/Button';
import ButtonIcon from '../../components/login/button/ButtonIcon';
import GoogleIcon from '../../public/icons/google.svg';
import FaceBookIcon from '../../public/icons/facebook.svg';
import GitHubIcon from '../../public/icons/github.svg';

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required('No email provided').email(),
  password: Yup.string().required('No password provided.').min(7, 'Password is too short - should be 7 chars minimum.'),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password }) => {
      // Make a request to your backend to store the data
      console.log({ email, password });
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

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
      <Input
        id={'email'}
        label="Email"
        type="email"
        placeholder="username@gmail.com"
        onChange={handleChange}
        value={values.email}
        errors={errors.email}
        touched={touched.email}
      />
      <Input
        id={'password'}
        label="Password"
        type="password"
        placeholder="Password"
        value={values.password}
        errors={errors.password}
        touched={touched.password}
        onChange={handleChange}
      />
      <p className="text-sm">
        <Link
          className="text-dark-blue font-medium hover:text-blue-500"
          href="/forgetpassword"
        >
          Forget Password?
        </Link>
      </p>
      <Button
        custom="xl:w-[70%]"
        label={isLoading ? 'Loading' : 'Sign In'}
        onClick={handleSubmit}
      />
      <div className="xl:w-[70%] mt-1">
        <p className="text-sm text-gray-400 text-center">or continue with</p>
      </div>
      <div className="xl:w-[70%] grid grid-cols-3 gap-2">
        <ButtonIcon
          iconImage={GoogleIcon}
          width={22}
          height={22}
          description={'Login with Google'}
          onClick={() => ''}
        />
        <ButtonIcon
          iconImage={GitHubIcon}
          width={22}
          height={22}
          description={'Login with Github'}
          onClick={() => ''}
        />
        <ButtonIcon
          iconImage={FaceBookIcon}
          width={22}
          height={22}
          description={'Login with Facebook'}
          onClick={() => ''}
        />
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
