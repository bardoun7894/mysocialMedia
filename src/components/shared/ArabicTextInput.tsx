import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

interface ArabicTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  rows?: number;
  required?: boolean;
  error?: string;
}

const ArabicTextInput: React.FC<ArabicTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  rows = 3,
  required = false,
  error
}) => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = `
    w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
          dir={isRTL ? 'rtl' : 'ltr'}
          lang={isRTL ? 'ar' : 'en'}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClasses}
          dir={isRTL ? 'rtl' : 'ltr'}
          lang={isRTL ? 'ar' : 'en'}
          inputMode={isRTL ? 'text' : undefined}
        />
      )}
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ArabicTextInput;
