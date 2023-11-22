import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../../../app/api/auth/[...nextauth]/options';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import VerificationForm from '../../../components/login/VerificationForm';

const Page = async () => {
  const session = await getServerSession(options);
  if (session?.user?.emailConfirmed) redirect('/dashboard');
  return (
    <div className=" min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-4 md:p-6">
      <Container custom={'rounded-[10px]'}>
        <FormWrap custom="p-10">
          <VerificationForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Page;
