import React from 'react';

import { Tabs } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';

const TableTabs = () => {
  return (
    <Tabs.Root
      defaultValue="account"
      className="border-none"
    >
      <Tabs.List className="flex gap-10 border-none">
        <Tabs.Trigger value="account">
          <p className="tableTab tableTabActive">Account</p>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="documents"
          className=""
        >
          <p className="tableTab data-[state=active]">Document</p>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          className=""
        >
          <p className="tableTab">Settings</p>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default TableTabs;
