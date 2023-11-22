import { tailwindMerge } from '@/utils/helper';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

export type tabsListType = {
  value: string;
  label: string;
};

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  tabNames: tabsListType[];
};

const CommonTabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, tabNames, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={tailwindMerge(
        'flex h-9 items-center justify-start rounded-lg p-1 text-theme-foreground gap-2',
        className,
      )}
      {...props}
    >
      {tabNames.map((tabName) => (
        <TabsPrimitive.Trigger
          key={tabName.value}
          value={tabName.value}
          className={tailwindMerge(
            'inline-flex items-center font-semibold text-base justify-center whitespace-nowrap px-3 py-1 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:text-theme-text data-[state=active]:border-theme-text',
            className,
          )}
        >
          {tabName.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  ),
);

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={tailwindMerge(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { CommonTabs, TabsContent, TabsList };
