'use client';

import { cva } from 'class-variance-authority';
import type { ChangeEvent, ReactNode } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { tailwindMerge } from '../utils/helper';

export interface TextareaProps {
  intent?: 'primary' | 'secondary' | 'outline' | 'disabled' | 'simple';
  className?: string;
  placeholder?: string;
  icon?: ReactNode;
  name: string;
  value?: string;
  errors?: FieldErrors;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const textAreaVariants = cva(
  [
    'flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      intent: {
        primary: ['border-celestial_blue', 'focus:border-dark-mode'],
        secondary: ['border-seasalt', 'focus:border-ocean_blue'],
        outline: ['border-light-mode', 'focus:border-midnight_blue'],
        disabled: ['bg-gray-300', 'text-gray-500', 'cursor-not-allowed'],
        simple: ['border-none', 'focus-visible:ring-0'],
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

const CommonTextarea = ({
  intent,
  placeholder,
  className,
  value,
  icon,
  name,
  errors,
  onChange,
  maxLength,
  isDisabled,
  ...props
}: TextareaProps) => {
  return (
    <div className="w-full relative">
      {icon && icon}
      <textarea
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        readOnly={isDisabled}
        placeholder={placeholder ? placeholder : ' '}
        className={tailwindMerge([
          textAreaVariants({ intent: intent, className: className }),
          errors && errors[name]?.message && 'border-red-500',
          isDisabled && 'cursor-pointer',
        ])}
        disabled={intent === 'disabled'}
        {...props}
      />
      {!!errors && (
        <label
          htmlFor={name}
          className={`
          text-sm
          mt-2
          duration-100
          transform
          -translate-y-3
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
    </div>
  );
};

export default CommonTextarea;
