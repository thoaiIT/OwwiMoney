'use client';

import Image from 'next/image';
import Heading from '../../components/login/Heading';
import OwwiFigure from '../../public/img/Owwi_figure.png';
import Input from '../../components/login/input/Input';
import { useEffect, useState } from 'react';
import Button from '../../components/login/button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { confirmOTP } from '../../actions/OTP/confirmOTP';
import { sendOTP } from '../../actions/OTP/sendOTP';
import { HttpStatusCodes } from '../../helper/type';
import { useRouter } from 'next/navigation';

const schema = Yup.object().shape({
  verification: Yup.string()
    .required('Require verification code!')
    .max(6, '6 digits code required')
    .min(6, '6 digits code required'),
});

const VerificationForm = () => {
  // const [value, setValue] = useState<number | ''>('');
  const router = useRouter();
  const [time, setTime] = useState(5);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resend]);

  const formik = useFormik({
    initialValues: {
      verification: '',
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ verification }: { verification: string }) => {
      // Make a request to your backend to store the data
      console.log({ verification });

      const result = await confirmOTP(String(verification));
      if (result.status && result.status.code === 201) {
        //Authorize

        router.push('/');
      } else {
        // Show error
      }
      console.log({ result });
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

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
      <Input
        id="verification"
        custom="border-blue-sm border-[2px] rounded-[5px] text-blue-900 text-2xl remove-arrow"
        onChange={handleChange}
        type="number"
        value={values.verification}
        errors={errors.verification}
        touched={touched.verification}
        resend={resend}
      />
      <div className="text-color-resend text-center ">{displayTime()}</div>
      <Button
        label="VERIFY"
        onClick={handleSubmit}
        custom="rounded-[5px] bg-dark-blue text-white"
      />
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
