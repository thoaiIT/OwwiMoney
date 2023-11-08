import { render } from '@react-email/render';
import WelcomeTemplate from '../../emails/EmailTemplate';
import { sendEmail } from '../../helper/lib/email';

export default async function page() {
  await sendEmail({
    to: 'buoibonbua@gmail.com',
    subject: 'Welcome to NextAPI',
    html: render(WelcomeTemplate()),
  });
  return <div>testmail page. sent</div>;
}
