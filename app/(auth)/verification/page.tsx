import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import VerificationForm from './VerificationForm';

const Page = () => {
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
