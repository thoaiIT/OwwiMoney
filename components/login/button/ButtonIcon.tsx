'use client';

import Image from 'next/image';

interface ButtonProps {
  disabled?: boolean;
  custom?: string;
  iconImage: string;
  description: string;
  width: number;
  height: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ disabled, custom, iconImage, onClick, description, width, height }) => {
  return (
    <button
      disabled={disabled}
      className={`p-2 hover:border-rose-700 disabled:cursor-not-allowed rounded-full transition w-full flex items-center justify-center border-slate-400 border-[1px] 
      
      ${custom ? custom : ''}`}
      onClick={onClick}
    >
      <Image
        src={iconImage}
        alt={description}
        width={width}
        height={height}
      />
    </button>
  );
};

export default Button;
