import React from 'react';
import { useRTL } from '../../hooks/useRTL';
import Button from '../atoms/Button';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  subtitle?: string;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  submitVariant?: 'primary' | 'secondary' | 'danger';
  submitDisabled?: boolean;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  title,
  subtitle,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  loading = false,
  disabled = false,
  className = '',
  submitVariant = 'primary',
  submitDisabled = false,
}) => {
  const { isRTL } = useRTL();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const formClasses = `
    bg-white rounded-lg shadow-md p-6
    ${className}
  `;

  const headerClasses = `
    mb-6
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  const titleClasses = 'text-xl font-semibold text-gray-900';
  const subtitleClasses = 'text-sm text-gray-500 mt-1';

  const actionsClasses = `
    mt-6 flex justify-end space-x-3
    ${isRTL ? 'space-x-reverse' : ''}
  `;

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      {(title || subtitle) && (
        <div className={headerClasses}>
          {title && <h2 className={titleClasses}>{title}</h2>}
          {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        </div>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
      
      <div className={actionsClasses}>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading || disabled}
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          type="submit"
          variant={submitVariant}
          loading={loading}
          disabled={disabled || submitDisabled}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
