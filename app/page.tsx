import CommonCard from '../ui/components/CommonCard';
import ThemeSwitch from '../ui/components/theme-switch';

export default function Home() {
  return (
    <div className="w-10 ">
      <ThemeSwitch />
      <CommonCard className="h-25 ml-4 ">
        <div>hello world!!</div>
        <div>hello world!!</div>
      </CommonCard>
    </div>
  );
}
