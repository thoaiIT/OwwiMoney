'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { sendOTP } from '../../../actions/OTP/sendOTP';
import { CommonButton } from '../../../components/button';
import CommonInput from '../../../components/input';
import Heading from '../../../components/login/Heading';
import OwwiFigure from '../../../public/img/Owwi_figure.png';

const schema = Yup.object().shape({
  verification: Yup.string()
    .required('Require verification code!')
    .max(6, '6 digits code required')
    .min(6, '6 digits code required'),
});

const VerificationForm = () => {
  // const [value, setValue] = useState<number | ''>('');
  const router = useRouter();
  const [time, setTime] = useState(10);
  const [resend, setResend] = useState(false);

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

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = event.target.value;

  //   const numericValue = inputValue.replace(/[^0-9]/g, '');

  //   const truncatedValue = numericValue.slice(0, 6);

  //   setValue(truncatedValue === '' ? '' : parseInt(truncatedValue, 10));
  // };

  const resendOTPHandler = async () => {
    await sendOTP();
  };

  const handleSubmitForm = handleSubmit((values: { verification: string }) => {
    console.log(values);
  });
  return (
    <>
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
            value={value}
            onChange={(e) => {
              let numericValue = e.target.value.replace(/\D/g, '');
              numericValue = numericValue.length > 0 && numericValue[0] !== '0' ? numericValue : '';
              onChange(numericValue);
            }}
            type="text"
            className="text-center border-blue-sm border-[2px] rounded-[5px] text-blue-900 text-2xl remove-arrow p-6"
            errors={errors.verification?.message}
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
              setTime(5);
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
