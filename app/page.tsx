import Container from '../ui/components/Container';
import FormWrap from '../ui/components/FormWrap';
import RegisterForm from './register/RegisterForm';

export default function Home() {
  return (
    <div className="bg-owwi-pattern bg-cover bg-no-repeat flex-grow flex items-center p-12">
      <Container>
        <div className="grid xl:grid-cols-2 gap-2">
          <FormWrap>
            <RegisterForm />
          </FormWrap>
          <div className="">Owwi Image</div>
        </div>
      </Container>
    </div>
  );
}
