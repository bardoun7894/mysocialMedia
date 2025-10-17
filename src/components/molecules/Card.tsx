import React from 'react';
import { useRTL } from '../../hooks/useRTL';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
  onClick,
}) => {
  const { isRTL } = useRTL();

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const borderClass = border ? 'border border-gray-200' : '';
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  const cardClasses = `
    bg-white rounded-lg
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${borderClass}
    ${hoverClass}
    ${clickableClass}
    ${className}
  `;

  const headerClasses = `
    mb-4
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  const titleClasses = 'text-lg font-semibold text-gray-900';
  const subtitleClasses = 'text-sm text-gray-500 mt-1';

  const footerClasses = `
    mt-4 pt-4 border-t border-gray-200
    ${isRTL ? 'text-right' : 'text-left'}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className={headerClasses}>
          {title && <h3 className={titleClasses}>{title}</h3>}
          {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};

export default Card;
