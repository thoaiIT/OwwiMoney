import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { tailwindMerge } from '../utils/helper';

const buttonVariants = cva('px-4', {
  variants: {
    variant: {
      primary: 'bg-celestial_blue text-white',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'bg-white border-black text-black',
      disable: 'opacity-50',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CommonButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={tailwindMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

CommonButton.displayName = 'Button';

export { CommonButton, buttonVariants };
