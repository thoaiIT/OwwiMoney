import MailClient from './client';
export default async function page() {
  // const otp = GenerateOTP();
  // const template = generateMailOTP(otp.toString());
  // console.log({ otp, template });
  // await sendEmail({
  //   to: 'buoibonbua@gmail.com',
  //   subject: 'Welcome to NextAPI',
  //   html: template,
  // });

  return <MailClient />;
}
