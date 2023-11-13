'use client';

import type { IconType } from 'react-icons/lib';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, disabled, outline, small, custom, icon: Icon, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:cursor-not-allowed rounded-full transition w-full flex items-center justify-center gap-2 hover:bg-rose-700 
      ${outline ? 'bg-white' : 'bg-btn-color'}
      ${outline ? 'text-slate-700' : 'text-white'}
      ${small ? 'text-sm font-light' : 'text-md font-semibold'}
      ${small ? 'py-1 px-2 ' : 'py-3 px-4 '}
      ${custom ? custom : ''}`}
      onClick={onClick}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
