'use client';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, label, type, disabled, required, placeholder }) => {
  return (
    <div className="w-full relative">
      <div className="mb-2">{label}</div>
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={
          'peer xl:w-[70%] w-full p-4 outline-none bg-white font-light border-2 rounded-full transition disabled:opacity-70 disabled:cursor-not-allowed'
        }
      />
    </div>
  );
};

export default Input;
