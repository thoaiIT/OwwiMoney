import TransitionEffect from '@/components/TransitionEffect';
import OwwiFigure from '@/public/img/Owwi_figure.png';
import Image from 'next/image';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import LoginForm from './LoginForm';

const Page = async () => {
  return (
    <>
      <TransitionEffect />
      <div className="min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center justify-center p-2 md:p-6">
        <Container>
          <div className="grid xl:grid-cols-3 gap-2 relative">
            <FormWrap custom="xl:pl-20 xl:pr-60 pt-2 pb-4 col-span-2 p-10">
              <LoginForm />
            </FormWrap>

            <div className="bg-light-blue rounded-[40px]  hidden xl:block" />
            <Image
              src={OwwiFigure}
              alt="Owwi"
              className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 xl:block hidden"
              width={540}
              height={560}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page;
