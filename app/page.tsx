'use client';

import { Flex } from '@radix-ui/themes';
import { CommonButton } from '../components/button';
import CommonCard from '../ui/components/CommonCard';
import ThemeSwitch from '../ui/components/theme-switch';
import Logo from '../ui/Logo';
import CommonInput from '../components/input';
import type { EventFor } from '../helper/type';

export default function Home() {
  return (
    <div>
      <ThemeSwitch />
      <CommonCard className="h-25 ml-4 ">
        <Logo />
        <div>hello world!!</div>
        <div>hello world!!</div>
        <CommonButton variant={'outline'}>hello</CommonButton>
      </CommonCard>
      <Flex
        direction="column"
        gap="3"
        className="max-w-sm"
      >
        <CommonInput
          type="text"
          onChange={(e: EventFor<'input', 'onChange'>) => {
            console.log(e.target.value);
          }}
          placeholder="hello world!!"
          intent="primary"
        />
      </Flex>
    </div>
  );
}
