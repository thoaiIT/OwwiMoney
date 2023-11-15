import Image from 'next/image';
import Container from '../../../components/login/Container';
import FormWrap from '../../../components/login/FormWrap';
import RegisterForm from './RegisterForm';
import OwwiFigure from '../../../public/img/Owwi_figure.png';

const Page = () => {
  return (
    <div className="min-h-screen bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-12">
      <Container custom="w-[1426px] h-[749px]">
        <div className="grid xl:grid-cols-2 gap-2 h-full relative">
          <FormWrap custom="px-6 md:px-12">
            <RegisterForm />
          </FormWrap>
          <Image
            src={OwwiFigure}
            alt="owwi"
            width={70}
            height={70}
            className="absolute right-0 xl:hidden"
          />
          <div className="xl:grid grid-cols-3 relative hidden">
            <div className="">
              <Image
                src={OwwiFigure}
                alt="owwi"
                width={700}
                height={700}
                className="absolute left-[-100px] xl:top-12"
              />
            </div>
            <div className="bg-light-blue rounded-[40px] col-span-2 " />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
