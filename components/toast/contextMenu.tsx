import { tailwindMerge } from '@/utils/helper';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import React from 'react';
import { BsCheck, BsChevronRight, BsCircle } from 'react-icons/bs';

const CmContextMenu = ContextMenuPrimitive.Root;

const CmContextMenuTrigger = ContextMenuPrimitive.Trigger;

const CmContextMenuGroup = ContextMenuPrimitive.Group;

const CmContextMenuPortal = ContextMenuPrimitive.Portal;

const CmContextMenuSub = ContextMenuPrimitive.Sub;

const CmContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const CmContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={tailwindMerge(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <BsChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
CmContextMenuSubTrigger.displayName = 'CmContextMenuSubTrigger';

const CmContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={tailwindMerge(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-theme p-1 text-theme-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
CmContextMenuSubContent.displayName = 'CmContextMenuSubContent';

const CmContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={tailwindMerge(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-theme p-1 text-theme-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
CmContextMenuContent.displayName = 'CmContextMenuContent';

const CmContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={tailwindMerge(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
CmContextMenuItem.displayName = 'CmContextMenuItem';

const CmContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={tailwindMerge(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <BsCheck className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
CmContextMenuCheckboxItem.displayName = 'CmContextMenuCheckboxItem';

const CmContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={tailwindMerge(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <BsCircle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
CmContextMenuRadioItem.displayName = 'CmContextMenuRadioItem';

const CmContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={tailwindMerge('px-2 py-1.5 text-sm font-semibold text-foreground', inset && 'pl-8', className)}
    {...props}
  />
));
CmContextMenuLabel.displayName = 'CmContextMenuLabel';

const CmContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={tailwindMerge('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
CmContextMenuSeparator.displayName = 'CmContextMenuSeparator';

const CmContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={tailwindMerge('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
CmContextMenuShortcut.displayName = 'CmContextMenuShortcut';

export {
  CmContextMenu,
  CmContextMenuCheckboxItem,
  CmContextMenuContent,
  CmContextMenuGroup,
  CmContextMenuItem,
  CmContextMenuLabel,
  CmContextMenuPortal,
  CmContextMenuRadioGroup,
  CmContextMenuRadioItem,
  CmContextMenuSeparator,
  CmContextMenuShortcut,
  CmContextMenuSub,
  CmContextMenuSubContent,
  CmContextMenuSubTrigger,
  CmContextMenuTrigger,
};
