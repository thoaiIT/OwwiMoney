'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { tailwindMerge } from '../utils/helper';

const buttonVariants = cva('w-full flex items-center justify-center', {
  variants: {
    intent: {
      primary: [
        'bg-celestial_blue-500',
        'from-celestial_blue-300',
        'to-celestial_blue-500',
        'text-white',
        'rounded-full',
        'hover:ring-2',
        'hover:bg-celestial_blue-400',
      ],
      secondary: [
        'bg-btn-color',
        'from-rose-300',
        'to-rose-500',
        'text-white',
        'rounded-full',
        'hover:ring-rose-700',
        'hover:bg-rose-700',
      ],
      outline: ['bg-white', 'border-white-400', ' text-black', 'border', 'rounded-full', 'hover:ring-1 ring-white-300'],
      disable: [
        'bg-white-400',
        'from-white-300',
        'to-white-400',
        'text-white-100',
        'rounded-full',
        'hover:ring-2 ring-white-300',
      ],
      ghost: ['bg-mango-200', 'text-white', 'rounded-full', 'hover:ring-2 ring-mango-300'],
      link: ['text-midnight_blue-100', 'underline-offset-2', 'hover:underline', 'hover:text-celestial_blue-500'],
    },
    size: {
      default: ['h-10', 'px-4', 'py-2'],
      sm: ['h-9', 'rounded-md', 'px-3'],
      lg: ['h-11', 'rounded-md', 'px-8'],
      icon: ['h-10', 'w-10'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'default',
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CommonButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={tailwindMerge(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

CommonButton.displayName = 'Button';

export { buttonVariants, CommonButton };
