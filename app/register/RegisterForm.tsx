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
        title="OwwiMoney"
        custom="md:text-7xl text-4xl text-center xl:text-start text-owwi-title mt-4"
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
      />
      <Input
        id={'password'}
        label="Password"
        type="password"
        placeholder="Password"
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
        onClick={() => {
          return '';
        }}
      />
      <div className="xl:w-[70%] mt-3">
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
      <div className="xl:w-[70%] mt-3">
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

export default RegisterForm;
