'use client';

import { Box, Flex } from '@radix-ui/themes';
import CommonInput from '../components/input';
import CommonCard from '../ui/components/CommonCard';
import ThemeSwitch from '../ui/components/theme-switch';
import Logo from '../ui/Logo';
import { CommonButton } from '../components/button';

export default function Home() {
  return (
    <div>
      <ThemeSwitch />
      <CommonCard className="h-25 ml-4 ">
        <Logo />
        <div>hello world!!</div>
        <div>hello world!!</div>
        <CommonButton intent={'link'}>hello</CommonButton>
      </CommonCard>
      <Flex
        direction="column"
        gap="3"
        className="max-w-sm"
      >
        <CommonInput
          type="text"
          onChange={(e) => {
            console.log(e);
          }}
          placeholder="hello world!!"
          intent="primary"
        />
      </Flex>
    </div>
  );
}
