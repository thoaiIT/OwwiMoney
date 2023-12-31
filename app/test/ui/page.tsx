'use client';

import DialogTest from '@/app/test/ui/dialog';
import { CommonPopover, CommonPopoverContent, CommonPopoverTrigger } from '@/components/Popover';
import { CommonTabs, TabsContent, TabsList } from '@/components/Tab';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '@/components/card';
import ClientOnly from '@/components/clientOnly';
import CommonCombobox from '@/components/combobox';
import CommonInput from '@/components/input';
import ThemeSwitch from '@/components/theme-switch';
import {
  CmContextMenu,
  CmContextMenuCheckboxItem,
  CmContextMenuContent,
  CmContextMenuItem,
  CmContextMenuLabel,
  CmContextMenuRadioGroup,
  CmContextMenuRadioItem,
  CmContextMenuSeparator,
  CmContextMenuShortcut,
  CmContextMenuSub,
  CmContextMenuSubContent,
  CmContextMenuSubTrigger,
  CmContextMenuTrigger,
} from '@/components/toast/contextMenu';
import type { EventFor } from '@/helper/type';
import { Button, Flex } from '@radix-ui/themes';

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
            name="test"
            onChangeHandler={() => {}}
            optionsProp={frameworks}
            widthSelection={400}
            maxVisibleItems={5}
            placeholder={'Select framework...'}
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
          name="demoText"
          placeholder="hello world!!"
          intent="primary"
        />
        <ClientOnly>
          <DialogTest />
        </ClientOnly>
      </Flex>
      <CommonCard className="w-96">
        <CardContent>
          <CmContextMenu>
            <CmContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </CmContextMenuTrigger>
            <CmContextMenuContent className="w-64">
              <CmContextMenuItem inset>
                Back
                <CmContextMenuShortcut>⌘[</CmContextMenuShortcut>
              </CmContextMenuItem>
              <CmContextMenuItem
                inset
                disabled
              >
                Forward
                <CmContextMenuShortcut>⌘]</CmContextMenuShortcut>
              </CmContextMenuItem>
              <CmContextMenuItem inset>
                Reload
                <CmContextMenuShortcut>⌘R</CmContextMenuShortcut>
              </CmContextMenuItem>
              <CmContextMenuSub>
                <CmContextMenuSubTrigger inset>More Tools</CmContextMenuSubTrigger>
                <CmContextMenuSubContent className="w-48">
                  <CmContextMenuItem>
                    Save Page As...
                    <CmContextMenuShortcut>⇧⌘S</CmContextMenuShortcut>
                  </CmContextMenuItem>
                  <CmContextMenuItem>Create Shortcut...</CmContextMenuItem>
                  <CmContextMenuItem>Name Window...</CmContextMenuItem>
                  <CmContextMenuSeparator />
                  <CmContextMenuItem>Developer Tools</CmContextMenuItem>
                </CmContextMenuSubContent>
              </CmContextMenuSub>
              <CmContextMenuSeparator />
              <CmContextMenuCheckboxItem checked>
                Show Bookmarks Bar
                <CmContextMenuShortcut>⌘⇧B</CmContextMenuShortcut>
              </CmContextMenuCheckboxItem>
              <CmContextMenuCheckboxItem>Show Full URLs</CmContextMenuCheckboxItem>
              <CmContextMenuSeparator />
              <CmContextMenuRadioGroup value="pedro">
                <CmContextMenuLabel inset>People</CmContextMenuLabel>
                <CmContextMenuSeparator />
                <CmContextMenuRadioItem value="pedro">Pedro Duarte</CmContextMenuRadioItem>
                <CmContextMenuRadioItem value="colm">Colm Tuite</CmContextMenuRadioItem>
              </CmContextMenuRadioGroup>
            </CmContextMenuContent>
          </CmContextMenu>
          <CommonPopover>
            <CommonPopoverTrigger asChild>
              <Button variant="outline">Open Commonpopover</Button>
            </CommonPopoverTrigger>
            <CommonPopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="width">Width</label>
                    <input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="maxWidth">Max. width</label>
                    <input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="height">Height</label>
                    <input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="maxHeight">Max. height</label>
                    <input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </CommonPopoverContent>
          </CommonPopover>
        </CardContent>
      </CommonCard>
    </div>
  );
}
