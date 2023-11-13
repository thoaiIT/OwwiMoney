import { CommonButton } from '../components/button';
import CommonCard from '../ui/components/CommonCard';
import ThemeSwitch from '../ui/components/theme-switch';
import Logo from '../ui/Logo';

export default function Home() {
  return (
    <div>
      <ThemeSwitch />
      <CommonCard className="h-25 ml-4 ">
        <Logo />
        <div>hello world!!</div>
        <div>hello world!!</div>
        <CommonButton
          size={'default'}
          variant={'outline'}
        >
          adas
        </CommonButton>
      </CommonCard>
    </div>
  );
}
