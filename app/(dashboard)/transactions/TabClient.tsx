'use client';
import { CommonTabs, TabsContent, TabsList, type tabsListType } from '@/components/Tab';
import { CommonButton } from '@/components/button';
import type React from 'react';
import type { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

type TabClientProps = {
  defaultValue: string;
  tabNames: tabsListType[];
  tabContents: { children: ReactNode; value: string }[];
};

const TabClient: React.FC<TabClientProps> = ({ defaultValue, tabNames, tabContents }) => {
  return (
    <CommonTabs defaultValue={defaultValue}>
      <div className="flex justify-between">
        <TabsList tabNames={tabNames} />
        <CommonButton className="w-[208px] duration-300 transition-all bg-theme-component flex gap-2 hover:duration-300 hover:transition-all hover:bg-theme-component hover:opacity-80 hover:ring-0">
          <FaPlus />
          Add Transactions
        </CommonButton>
      </div>
      {tabContents.map((tabContent) => (
        <TabsContent
          key={tabContent.value}
          value={tabContent.value}
          className="mt-6"
        >
          {tabContent.children}
        </TabsContent>
      ))}
    </CommonTabs>
  );
};

export default TabClient;
