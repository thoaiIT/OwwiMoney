'use server';

import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const smtpOptions = {
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'user',
      pass: process.env.SMTP_PASSWORD || 'password',
    },
  };

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  const abc = await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
    to: data.to.toLowerCase(),
  });

  return abc;
};
