'use client';

import CommonCombobox from '@/components/Combobox';
import { CommonTabs, TabsContent, TabsList } from '@/components/Tab';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '@/components/card';
import DialogForm from '@/components/dialog/formDialog';
import CommonInput from '@/components/input';
import ThemeSwitch from '@/components/theme-switch';
import type { EventFor } from '@/helper/type';
import { Box, Flex } from '@radix-ui/themes';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'js',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'HTML',
  },
  {
    value: 'css',
    label: 'CSS',
  },
];
export default function Home() {
  return (
    <div className="ml-6">
      Home
      <ThemeSwitch />
      <CommonCard className="w-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <CommonCombobox
            optionsProp={frameworks}
            widthSelection={400}
            maxVisibleItems={5}
            placeholder={'Select framework...'}
            isDisabled
          />
        </CardContent>
        <CardFooter>
          <CommonTabs defaultValue="account">
            <TabsList
              tabNames={[
                { value: 'account', label: 'Account' },
                { value: 'password', label: 'Password' },
                { value: 'email', label: 'Email' },
              ]}
            />
            <TabsContent value="account">{'Tabbbbb account'}</TabsContent>
            <TabsContent value="password">{'Tabbbbb Password'}</TabsContent>
            <TabsContent value="email">{'EmailEmailEmailEmail'}</TabsContent>
          </CommonTabs>
        </CardFooter>
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
