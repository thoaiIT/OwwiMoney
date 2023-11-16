'use client';
import type { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errors?: FormikErrors<string>;
  touched?: FormikTouched<boolean>;
  custom?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  resend?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  placeholder,
  onChange,
  value,
  errors,
  touched,
  custom,
  maxLength,
  min,
  max,
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
        className={`${custom} peer w-full p-3 outline-none bg-white font-light border-2 transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${errors ? 'border-red-600 border-[2px] ' : ''}`}
        value={value}
        maxLength={maxLength}
        min={min}
        max={max}
      />
      {errors && touched && <p className="text-sm text-red-600">{errors}</p>}
    </div>
  );
};

export default Input;
