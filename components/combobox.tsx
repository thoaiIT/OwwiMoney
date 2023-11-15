'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { tailwindMerge } from '../utils/helper';
import { CommonButton } from './button';
import { SlArrowDown } from 'react-icons/sl';
import { BsCheck } from 'react-icons/bs';

type dataType = {
  value: string;
  label: string;
};

type OptionItemProps = dataType & {
  onSelect: (value: string) => void;
  isActive?: boolean;
};

type CommonComboboxProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    options: dataType[];
    widthSelection: number;
    maxVisibleItems?: number;
  };

const CommonCombobox = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, CommonComboboxProps>(
  ({ className, options, widthSelection, maxVisibleItems, align = 'center', sideOffset = 4, ...props }, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const height: number = (maxVisibleItems as number) * 40;
    const maxheight: string = `${height ? `max-h-[${height.toString()}px] overflow-y-scroll` : ''}`;
    console.log({ height, maxVisibleItems, maxheight });
    return (
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverPrimitive.Trigger asChild>
          <CommonButton
            intent="outline"
            className={tailwindMerge('justify-between', `w-[${widthSelection.toString()}px]`)}
          >
            {value ? options.find((option) => option.value === value)?.label : 'Select framework...'}
            <SlArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </CommonButton>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={tailwindMerge(
              'z-50 rounded-md border bg-white text-black shadow-md outline-none',
              `w-[${widthSelection.toString()}px] ${maxheight}`,
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                label={option.label}
                value={option.value}
                onSelect={(value) => {
                  setValue(value);
                }}
                isActive={value === option.value}
              />
            ))}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
CommonCombobox.displayName = 'Combobox';

export default CommonCombobox;

const OptionItem: React.FC<OptionItemProps> = ({ label, value, onSelect, isActive }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSelect(value);
    }
  };
  return (
    <div
      tabIndex={0}
      onClick={() => {
        onSelect(value);
      }}
      onKeyDown={handleKeyPress}
      role="button"
      className={tailwindMerge(
        'py-2 px-4 hover:opacity-100 hover:duration-300 flex items-center',
        isActive
          ? 'bg-midnight_blue-200 text-white rounded'
          : 'hover:duration-300 hover:bg-seasalt hover:rounded hover:cursor-pointer',
      )}
    >
      {label}
      <BsCheck className={tailwindMerge('ml-auto h-4 w-4', isActive ? 'opacity-100' : 'opacity-0')} />
    </div>
  );
};
