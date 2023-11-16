'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { GenerateOTP } from '../../../utils';
import { registerOTPTemplate } from '../../../actions/mail/registerOTPTemplate';
import { sendEmail } from '../../../helper/lib/email';
import { registerOTP } from '../../../actions/OTP/registerOTP';
import { confirmOTP } from '../../../actions/OTP/confirmOTP';

function client() {
  const sendEmailHandler = async () => {
    const otp = GenerateOTP();
    const template = registerOTPTemplate(otp.toString(), '');
    await registerOTP(otp.toString(), '');
    await sendEmail({
      to: 'buoibonbua@gmail.com',
      subject: 'Welcome to OwwiMoney',
      html: template,
    });
    console.log('sent');
  };

  const confirmOTPHandler = async (formData: FormData) => {
    const otp = formData.get('otp')?.toString() || '';
    const check = await confirmOTP(otp);
    if (check) {
      console.log('OK');
    } else {
      console.log('ERROR');
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <form
          action={sendEmailHandler}
          className="flex gap-2"
        >
          <Button type="submit">Send Mail</Button>
        </form>
        <form action={confirmOTPHandler}>
          <input
            id="otp"
            type="text"
            name="otp"
          />
          <Button type="submit">Confirm OTP</Button>
        </form>
      </div>
    </>
  );
}

export default client;
