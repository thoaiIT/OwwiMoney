'use client';

import { CommonButton } from '../components/button';
import CommonCard from '../ui/components/CommonCard';
import ThemeSwitch from '../ui/components/theme-switch';
import Logo from '../ui/Logo';
import CommonInput from '../components/input';
import type { EventFor } from '../helper/type';
import { Box, Flex } from '@radix-ui/themes';

import DialogForm from '../components/dialog/formDialog';

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

        <Box className="p-4">
          <DialogForm
            titleDialog="hello"
            handleSubmit={() => console.log('check')}
          >
            <text className="text-mauve11 pt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when you are done.
            </text>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="Cú đụt"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@abc"
              />
            </fieldset>
          </DialogForm>
        </Box>
      </Flex>
    </div>
  );
}
