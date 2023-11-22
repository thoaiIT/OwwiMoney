'use client';
import { CommonTabs, TabsContent, TabsList, type tabsListType } from '@/components/Tab';
import type React from 'react';
import type { ReactNode } from 'react';

type TabClientProps = {
  defaultValue: string;
  tabNames: tabsListType[];
  tabContents: { children: ReactNode; value: string }[];
};

const TabClient: React.FC<TabClientProps> = ({ defaultValue, tabNames, tabContents }) => {
  return (
    <CommonTabs defaultValue={defaultValue}>
      <TabsList tabNames={tabNames} />
      {tabContents.map((tabContent) => (
        <TabsContent
          key={tabContent.value}
          value={tabContent.value}
        >
          {tabContent.children}
        </TabsContent>
      ))}
    </CommonTabs>
  );
};

export default TabClient;
