import React from 'react';
import { useRTL } from '../../hooks/useRTL';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  id,
  name,
  autoComplete,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  dir,
}) => {
  const { isRTL } = useRTL();
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = `
    w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
    ${className}
  `;

  const labelClasses = `
    block text-sm font-medium text-gray-700 mb-1
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  const errorClasses = `
    mt-1 text-sm text-red-600
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  const inputDir = dir || (isRTL ? 'rtl' : 'ltr');

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        dir={inputDir}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
      />
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  );
};

export default Input;
