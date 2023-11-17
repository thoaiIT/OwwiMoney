import { cva } from 'class-variance-authority';
import { forwardRef, type HTMLInputTypeAttribute, type InputHTMLAttributes, type ReactNode } from 'react';
import { tailwindMerge } from '../utils/helper';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  intent?: 'primary' | 'secondary' | 'outline' | 'disabled' | 'simple';
  className?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  label?: string;
  errors?: string;
}

const textFieldVariants = cva(
  [
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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

const CommonInput = forwardRef<HTMLInputElement, InputProps>(
  ({ intent, placeholder, className, type = 'text', label, errors, ...props }, ref) => {
    return (
      <div>
        <p className={`mb-2 ${errors ? 'text-red-500' : ''}`}>{label}</p>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={tailwindMerge(
            textFieldVariants({
              intent: intent,
              className: `${className} ${
                errors ? 'border-red-600 border-[1px] focus-visible:ring-red-500 focus-visible:border-red-500 ' : ''
              }`,
            }),
          )}
          {...props}
        />
        {!!errors && <p className="text-sm text-red-500 mt-2">{errors}</p>}
      </div>
    );
  },
);

export default CommonInput;
