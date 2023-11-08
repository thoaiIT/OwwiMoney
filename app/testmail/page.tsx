import { render } from '@react-email/render';
import EmailOTPTemplate from '../../emails/EmailTemplate';
import { sendEmail } from '../../helper/lib/email';

export default async function page() {
  await sendEmail({
    to: 'buoibonbua@gmail.com',
    subject: 'Welcome to NextAPI',
    html: render(EmailOTPTemplate('112111')),
  });
  return <div>testmail page. sent</div>;
}
