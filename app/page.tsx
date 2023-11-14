'use client';

import { CommonButton } from '../components/button';
import CommonInput from '../components/input';
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
        <CommonButton variant={'outline'}>hello</CommonButton>
        <CommonInput
          type="input"
          onChange={(e) => {
            console.log(e);
          }}
          placeholder="hello world!!"
          variant="primary"
        />
      </CommonCard>
    </div>
  );
}
