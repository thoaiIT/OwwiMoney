'use client';

import { forgetPassword } from '@/actions/user/forgetPassword';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CiLogout } from 'react-icons/ci';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { confirmOTP } from '../../actions/OTP/confirmOTP';
import { sendOTP } from '../../actions/OTP/sendOTP';
import OwwiFigure from '../../public/img/Owwi_figure.png';
import { CommonButton } from '../button';
import CommonInput from '../input';
import Heading from './Heading';

interface VerificationFormProps {
  type?: string;
  email?: string;
}

const schema = Yup.object().shape({
  verification: Yup.string()
    .required('Require verification code!')
    .max(6, '6 digits code required')
    .min(6, '6 digits code required'),
});

const VerificationForm: React.FC<VerificationFormProps> = ({ type, email }) => {
  const router = useRouter();
  const [time, setTime] = useState(60);
  const [resend, setResend] = useState(false);
  const { data: session, update } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      verification: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (type !== 'EmailVerification' && !session?.user?.emailConfirmed) sendOTP();
  }, []);

  useEffect(() => {
    if (session?.user?.emailConfirmed) redirect('/dashboard');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resend]);

  const displayTime = () => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    // Format the time as MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
  };

  const resendOTPHandler = async () => {
    if (type !== 'EmailVerification') await sendOTP();
    else {
      await forgetPassword({ email: email as string });
    }
  };

  const handleSubmitForm = handleSubmit(async (values: { verification: string }) => {
    const { verification } = values;
    const result = await confirmOTP(verification, email);
    if (result.status && result.status.code === 201) {
      if (type !== 'EmailVerification') {
        await update({ ...session, user: { ...session?.user, emailConfirmed: true } });
        router.replace('/dashboard');
      } else {
        router.replace('/newpassword');
      }
      toast.success('Verification updated successfully');
    } else {
      // Show error
      toast.error(result.message as string);
    }
    console.log({ result });
  });

  return (
    <>
      {type !== 'EmailVerification' && (
        <Link
          href="/api/auth/signout?callbackUrl=/login"
          className="text-color-resend hover:text-orange-600 hover:underline flex items-center font-semibold"
        >
          <CiLogout className="mr-2 " />
          Logout
        </Link>
      )}

      <div className="flex flex-col justify-center">
        <Image
          src={OwwiFigure}
          alt="Owwi"
          width={80}
          height={80}
          className="mx-auto"
        />

        <Heading
          title="Verification"
          custom=" text-5xl font-semibold text-dark-blue"
          center
        />
      </div>
      <p className="text-gray-400">Enter your 6 digits code that you received on your email.</p>
      <Controller
        name="verification"
        control={control}
        render={({ field: { onChange, value } }) => (
          <CommonInput
            name="verification"
            value={value}
            onChange={(e) => {
              let numericValue = e.target.value.replace(/\D/g, '');
              numericValue = numericValue.length > 0 && numericValue[0] !== '0' ? numericValue : '';
              onChange(numericValue);
            }}
            type="text"
            className="text-center border-blue-sm border-[2px] rounded-[5px] text-blue-900 text-2xl remove-arrow p-6"
            errors={errors}
            maxLength={6}
          />
        )}
      />
      <div className="text-color-resend text-center ">{displayTime()}</div>
      <CommonButton
        className="rounded-[5px] bg-dark-blue text-white hover:bg-blue-950"
        onClick={handleSubmitForm}
      >
        VERIFY
      </CommonButton>
      {time === 0 && (
        <p className="text-gray-400 mt-1 text-center">
          If you didn’t receive a code!
          <button
            className="ml-2 text-color-resend hover:text-orange-500"
            onClick={() => {
              console.log('click');
              setResend(true);
              setTime(60);
              resendOTPHandler();
            }}
          >
            Resend
          </button>
        </p>
      )}
    </>
  );
};

export default VerificationForm;
