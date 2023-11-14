'use client';

import type { FormikErrors, FormikTouched } from 'formik';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errors?: FormikErrors<string>;
  touched?: FormikTouched<boolean>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  placeholder,
  onChange,
  value,
  errors,
  touched,
}) => {
  return (
    <div className="w-full relative">
      <div className={`${errors ? 'text-red-600' : ''}`}>{label}</div>
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        className={`peer xl:w-[70%] w-full p-4 outline-none bg-white font-light border-2 rounded-full transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${errors ? 'border-red-600 border-[2px] ' : ''}`}
        value={value}
      />
      {errors && touched && <p className="text-sm text-red-600">{errors}</p>}
    </div>
  );
};

export default Input;
