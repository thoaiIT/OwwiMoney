import OwwiFigure from '@/public/img/Owwi_figure.png';
import Image from 'next/image';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import RegisterForm from './RegisterForm';

const Page = () => {
  return (
    <div className="min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center justify-center p-2 md:p-6">
      <Container>
        <div className="grid xl:grid-cols-3 gap-2 h-full relative">
          <FormWrap custom="xl:pl-16 xl:pr-64 pt-4 pb-6 col-span-2 p-10">
            <RegisterForm />
          </FormWrap>

          <div className="bg-light-blue rounded-[40px] hidden xl:block" />
          <Image
            src={OwwiFigure}
            alt="Owwi"
            className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 xl:block hidden"
            width={580}
            height={580}
          />
        </div>
      </Container>
    </div>
  );
};

export default Page;
