'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { useEffect, useState } from 'react';
import { tailwindMerge } from '../utils/helper';
import { SlArrowDown } from 'react-icons/sl';
import { BsCheck, BsSearch } from 'react-icons/bs';
import CommonInput from './input';

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
    optionsProp: dataType[];
    widthSelection: number;
    maxVisibleItems?: number;
    placeholder: string;
  };

const CommonCombobox = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, CommonComboboxProps>(
  (
    {
      className,
      optionsProp,
      widthSelection,
      maxVisibleItems,
      placeholder,
      align = 'center',
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const [options, setOptions] = useState<dataType[]>(optionsProp);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const height = (maxVisibleItems as number) * 38;

    const handleSearch = (searchString: string) => {
      setOptions(optionsProp.filter((option) => option.label.toLowerCase().includes(searchString.toLowerCase())));
    };

    useEffect(() => {
      if (!open) {
        setOptions(optionsProp);
      }
    }, [open, optionsProp]);

    return (
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverPrimitive.Trigger asChild>
          <div
            style={{ width: widthSelection }}
            className="justify-between border inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
          >
            {value ? optionsProp.find((option) => option.value === value)?.label : placeholder}
            <SlArrowDown className={`ml-2 h-4 w-4 shrink-0 opacity-50 ${open && 'rotate-180'}`} />
          </div>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            style={{ width: widthSelection }}
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={tailwindMerge(
              'z-50 rounded-md border bg-card text-card-foreground shadow-md outline-none',
              className,
            )}
            {...props}
          >
            <div className="flex items-center">
              <BsSearch className="w-4 ml-3" />
              <CommonInput
                intent="simple"
                placeholder="Search here... "
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div
              style={{ maxHeight: height }}
              className={`${maxVisibleItems && maxVisibleItems < options.length ? 'overflow-y-scroll' : ''} border-t-2`}
            >
              {options.map((option) => (
                <OptionItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  onSelect={(value) => {
                    setValue(value);
                    setOpen(false);
                  }}
                  isActive={value === option.value}
                />
              ))}
            </div>
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
        'py-2 px-4 hover:duration-300 flex items-center text-sm',
        'hover:duration-300 hover:bg-card-hover hover:rounded hover:cursor-pointer',
      )}
    >
      {label}
      <BsCheck className={tailwindMerge('ml-auto h-4 w-4', isActive ? 'opacity-100' : 'opacity-0')} />
    </div>
  );
};
