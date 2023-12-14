'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { BsCheck, BsSearch } from 'react-icons/bs';
import { SlArrowDown } from 'react-icons/sl';
import { tailwindMerge } from '../utils/helper';
import CommonInput, { capitalizeFirstLetter } from './input';

export type DataType = {
  value: string;
  label: string;
};

type OptionItemProps = {
  item: DataType;
  onSelect: (item: DataType) => void;
  isActive?: boolean;
};

type CommonComboboxProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    optionsProp: DataType[];
    widthSelection: number | string;
    maxVisibleItems?: number;
    placeholder: string;
    isDisabled?: boolean;
    label?: string;
    customLabel?: string;
    customInput?: string;
    name: string;
    valueProp?: string;
    onChangeHandler: (value: string) => void;
    errors?: FieldErrors;
  };

const CommonCombobox = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, CommonComboboxProps>(
  (
    {
      className,
      optionsProp,
      widthSelection,
      maxVisibleItems,
      placeholder,
      isDisabled,
      label,
      customLabel,
      customInput,
      name,
      valueProp,
      onChangeHandler,
      errors,
      align = 'center',
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const [options, setOptions] = useState<DataType[]>(optionsProp);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(valueProp || '');
    const [size, setSize] = useState<number>(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<string>(`${divRef.current?.offsetWidth}px`);

    const height = (maxVisibleItems as number) * 38;

    const handleSearch = (searchString: string) => {
      setOptions(optionsProp.filter((option) => option.label.toLowerCase().includes(searchString.toLowerCase())));
    };

    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
      if (!open) {
        setOptions(optionsProp);
      }
      setWidth(`${divRef.current?.offsetWidth}px`);
    }, [open, optionsProp, size]);

    useEffect(() => {
      setValue(valueProp as string);
    }, [valueProp]);

    return (
      <PopoverPrimitive.Root
        open={open && !isDisabled}
        onOpenChange={() => {
          if (!isDisabled) setOpen(!open);
        }}
      >
        {label && <p className={`mb-2 ${customLabel} ${errors && errors[name]?.message}`}>{label}</p>}
        <PopoverPrimitive.Trigger
          asChild
          name={name as string}
        >
          <div
            style={{ width: widthSelection }}
            ref={divRef}
            className={tailwindMerge(
              'justify-between h-10 px-2 py-2 border inline-flex items-center rounded-md text-sm transition-colors',
              `${isDisabled && 'opacity-50 pointer-events-none'}`,
              customInput,
              open && 'border-dark-mode',
              !!errors?.[name]?.message && 'border-red-500',
            )}
          >
            {!value ? placeholder : optionsProp.find((option) => option.value === value)?.label}
            <SlArrowDown className={`ml-2 h-2 w-2 shrink-0 opacity-50 ${open && 'rotate-180'}`} />
          </div>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            style={{ width: width }}
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={tailwindMerge(
              'z-50 rounded-md border bg-theme text-theme-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              className,
            )}
            {...props}
          >
            <div className="flex items-center">
              <BsSearch className="w-4 ml-3" />
              <CommonInput
                name="search"
                intent="simple"
                placeholder="Search here... "
                className="text-xs"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div
              style={{ maxHeight: height }}
              className={`${maxVisibleItems && maxVisibleItems < options.length ? 'overflow-y-scroll' : ''} border-t-2`}
            >
              {options.length <= 0 ? (
                <div
                  role="button"
                  className={tailwindMerge(
                    'py-2 px-4 hover:duration-300 flex items-center text-base',
                    'hover:duration-300 hover:bg-theme-hover hover:rounded hover:cursor-pointer',
                  )}
                >
                  No data
                </div>
              ) : (
                options.map((option) => (
                  <OptionItem
                    key={option.value}
                    item={option}
                    onSelect={(item) => {
                      onChangeHandler(item.value);
                      setValue(item.value);
                      setOpen(false);
                    }}
                    isActive={value === option.value}
                  />
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
        {!!errors && (
          <label
            htmlFor={name}
            className={`
          text-sm
          mt-2
          duration-100
          transform
          -translate-y-2
          z-100
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[name] ? 'text-red-500' : 'text-gray-400'}
        `}
          >
            {capitalizeFirstLetter(errors[name]?.message?.toString() || '')}
          </label>
        )}
      </PopoverPrimitive.Root>
    );
  },
);
CommonCombobox.displayName = 'Combobox';

export default CommonCombobox;

export const OptionItem: React.FC<OptionItemProps> = ({ item, onSelect, isActive }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSelect(item);
    }
  };
  return (
    <div
      tabIndex={0}
      onClick={() => {
        onSelect(item);
      }}
      onKeyDown={handleKeyPress}
      role="button"
      className={tailwindMerge(
        'py-2 px-4 hover:duration-300 flex items-center text-base',
        'hover:duration-300 hover:bg-theme-hover hover:rounded hover:cursor-pointer',
      )}
    >
      {item.label}
      <BsCheck className={tailwindMerge('ml-auto h-4 w-4', isActive ? 'opacity-100' : 'opacity-0')} />
    </div>
  );
};
