'use client';
import TransactionsDialog from '@/app/(dashboard)/transactions/TransactionsDialog';
import { CommonTabs, TabsContent, TabsList, type tabsListType } from '@/components/Tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { Suspense, useState, type ReactNode } from 'react';

type TabClientProps = {
  defaultValue: string;
  tabNames: tabsListType[];
  tabContents: { children: ReactNode; value: string }[];
};

const TabClient: React.FC<TabClientProps> = ({ defaultValue, tabNames, tabContents }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <CommonTabs
      defaultValue={defaultValue}
      onValueChange={(value) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('tab', value);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }}
    >
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
