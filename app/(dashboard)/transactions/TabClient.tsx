'use client';
import TransactionsDialog from '@/app/(dashboard)/transactions/TransactionsDialog';
import { CommonTabs, TabsContent, TabsList, type tabsListType } from '@/components/Tab';
import type React from 'react';
import { Suspense, useState, type ReactNode } from 'react';

type TabClientProps = {
  defaultValue: string;
  tabNames: tabsListType[];
  tabContents: { children: ReactNode; value: string }[];
};

const TabClient: React.FC<TabClientProps> = ({ defaultValue, tabNames, tabContents }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <CommonTabs defaultValue={defaultValue}>
      <div className="flex justify-between">
        <TabsList tabNames={tabNames} />
        <Suspense fallback={''}>
          <TransactionsDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </Suspense>
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
