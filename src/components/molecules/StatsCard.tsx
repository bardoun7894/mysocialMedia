import React from 'react';
import { useRTL } from '../../hooks/useRTL';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  loading?: boolean;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary',
  loading = false,
  className = '',
}) => {
  const { isRTL } = useRTL();

  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      iconBg: 'bg-primary-100',
      changePositive: 'text-primary-600',
      changeNegative: 'text-primary-600',
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      iconBg: 'bg-secondary-100',
      changePositive: 'text-secondary-600',
      changeNegative: 'text-secondary-600',
    },
    success: {
      bg: 'bg-success-50',
      text: 'text-success-600',
      iconBg: 'bg-success-100',
      changePositive: 'text-success-600',
      changeNegative: 'text-success-600',
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-600',
      iconBg: 'bg-warning-100',
      changePositive: 'text-warning-600',
      changeNegative: 'text-warning-600',
    },
    error: {
      bg: 'bg-error-50',
      text: 'text-error-600',
      iconBg: 'bg-error-100',
      changePositive: 'text-error-600',
      changeNegative: 'text-error-600',
    },
  };

  const currentColor = colorClasses[color];

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-soft p-6 animate-pulse ${className}`}>
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full ${currentColor.iconBg} mr-4`}></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow duration-300 ${className}`}>
      <div className="flex items-center">
        {icon && (
          <div className={`w-12 h-12 rounded-full ${currentColor.iconBg} flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
            <div className={currentColor.text}>{icon}</div>
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
              <span
                className={`text-sm font-medium ${
                  change.type === 'increase' ? currentColor.changePositive : currentColor.changeNegative
                }`}
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              {change.period && (
                <span className="text-sm text-gray-500">{change.period}</span>
              )}
              <div className={`flex items-center ${isRTL ? 'mr-1' : 'ml-1'}`}>
                {change.type === 'increase' ? (
                  <svg
                    className={`w-4 h-4 ${currentColor.changePositive}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`w-4 h-4 ${currentColor.changeNegative}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
