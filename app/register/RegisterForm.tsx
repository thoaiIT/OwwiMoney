'use client';

import Link from 'next/link';
import Heading from '../../ui/components/Heading';

import { useState } from 'react';
import Input from '../../ui/components/input/Input';
import Button from '../../ui/components/button/Button';
import ButtonIcon from '../../ui/components/button/ButtonIcon';
import GoogleIcon from '../../public/icons/google.svg';
import FaceBookIcon from '../../public/icons/facebook.svg';
import GitHubIcon from '../../public/icons/github.svg';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Heading
        title="Hello!"
        custom="md:text-7xl text-5xl text-center xl:text-start"
      />
      <Heading
        title="Sign Up to Get Started"
        custom="text-4xl text-center xl:text-start font-light"
      />
      <Input
        id={'email'}
        label="Email"
        type="email"
        placeholder="username@gmail.com"
      />
      <Input
        id={'password'}
        label="Password"
        type="password"
        placeholder="Password"
      />
      <Input
        id={'confirm_password'}
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
      />
      <p className="text-sm">
        Have an account yet?
        <Link
          className="ml-2 text-dark-blue font-medium hover:text-blue-500"
          href="/login"
        >
          Login here
        </Link>
      </p>
      <Button
        custom="xl:w-[70%]"
        label={isLoading ? 'Loading' : 'Register'}
        onClick={() => {
          return '';
        }}
      />
    </>
  );
};

export default RegisterForm;
