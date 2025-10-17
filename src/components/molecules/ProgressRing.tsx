import React from 'react';
import { useRTL } from '../../hooks/useRTL';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  label?: string;
  className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'primary',
  showPercentage = true,
  label,
  className = '',
}) => {
  const { isRTL } = useRTL();

  const colorClasses = {
    primary: '#7c3aed',
    secondary: '#475569',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  };

  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative"
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        <svg
          height={size}
          width={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            stroke={colorClasses[color]}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {showPercentage && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontSize: `${size / 5}px`,
            }}
          >
            <span className="font-semibold text-gray-900">{`${Math.round(progress)}%`}</span>
          </div>
        )}
      </div>
      {label && (
        <p className={`mt-2 text-sm font-medium text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
        </p>
      )}
    </div>
  );
};

export default ProgressRing;
