import React from 'react';
import { tailwindMerge } from '../utils/helper';
import { cva } from 'class-variance-authority';
import { TextField } from '@radix-ui/themes';
import type { EventFor } from '../helper/type';

interface TextFieldProps {
  variant: 'primary' | 'secondary' | 'outline' | 'disabled';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type: string;
}

const textFieldVariants = cva(['border', 'rounded-md', 'p-2'], {
  variants: {
    intent: {
      primary: ['border-celestial_blue', 'focus:border-dark-mode'],
      secondary: ['border-seasalt', 'focus:border-ocean_blue'],
      outline: ['border-light-mode', ' focus:border-midnight_blue'],
      disabled: ['bg-gray-300', 'text-gray-500', 'cursor-not-allowed'],
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

const CommonInput = ({ variant, onChange, placeholder, className, type, ...props }: TextFieldProps) => {
  const textFieldClasses = textFieldVariants({ intent: variant, className });

  return (
    <div className={textFieldClasses}>
      <TextField.Root>
        <TextField.Input
          type={type}
          placeholder={placeholder}
          onChange={(e: EventFor<'input', 'onChange'>) => onChange(e.target.value)}
          className={tailwindMerge(className)}
          {...props}
        />
      </TextField.Root>
    </div>
  );
};

export default CommonInput;
