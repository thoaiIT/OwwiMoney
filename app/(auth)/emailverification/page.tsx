import { redirect } from 'next/navigation';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import VerificationForm from '../../../components/login/VerificationForm';

interface searchParams {
  email: string;
}

const Page = async ({ searchParams }: { searchParams: searchParams }) => {
  if (!searchParams.email) redirect('/forgotpassword');
  return (
    <div className=" min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-4 md:p-6">
      <Container custom={'rounded-[10px]'}>
        <FormWrap custom="p-10">
          <VerificationForm
            type="EmailVerification"
            email={searchParams.email}
          />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Page;
