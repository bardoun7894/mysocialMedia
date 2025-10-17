import React from 'react';
import { useRTL } from '../../hooks/useRTL';

interface AnalyticsChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  type?: 'line' | 'bar' | 'doughnut' | 'pie';
  height?: number;
  loading?: boolean;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'line',
  height = 300,
  loading = false,
  className = '',
}) => {
  const { isRTL } = useRTL();

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Simple bar chart implementation using CSS
  if (type === 'bar') {
    const maxValue = Math.max(...data.datasets[0].data);
    
    return (
      <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>
        <div className="space-y-4" style={{ height: `${height}px` }}>
          {data.labels.map((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`w-24 text-sm font-medium text-gray-700 ${isRTL ? 'ml-4 text-right' : 'mr-4'}`}>
                  {label}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                  <div
                    className="bg-primary-500 h-8 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">{value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Simple line chart implementation using CSS
  if (type === 'line') {
    const maxValue = Math.max(...data.datasets[0].data);
    const points = data.datasets[0].data.map((value, index) => {
      const x = (index / (data.labels.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 100;
      return `${x}%,${y}%`;
    }).join(' ');
    
    return (
      <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>
        <div className="relative" style={{ height: `${height}px` }}>
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-gray-200 w-full"></div>
            ))}
          </div>
          
          {/* Line chart */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              points={points}
            />
            
            {/* Data points */}
            {data.datasets[0].data.map((value, index) => {
              const x = (index / (data.labels.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 100;
              
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill="#7c3aed"
                />
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {data.labels.map((label, index) => (
              <div key={index} className="text-xs text-gray-500">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Simple doughnut chart implementation using CSS
  if (type === 'doughnut') {
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;
    
    const segments = data.datasets[0].data.map((value, index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;
      
      return {
        value,
        percentage,
        startAngle,
        endAngle,
        label: data.labels[index],
        color: data.datasets[0].backgroundColor || `hsl(${index * 60}, 70%, 60%)`,
      };
    });
    
    return (
      <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {segments.map((segment, index) => {
                const radius = 40;
                const innerRadius = 25;
                const x1 = 50 + radius * Math.cos((segment.startAngle * Math.PI) / 180);
                const y1 = 50 + radius * Math.sin((segment.startAngle * Math.PI) / 180);
                const x2 = 50 + radius * Math.cos((segment.endAngle * Math.PI) / 180);
                const y2 = 50 + radius * Math.sin((segment.endAngle * Math.PI) / 180);
                const x3 = 50 + innerRadius * Math.cos((segment.startAngle * Math.PI) / 180);
                const y3 = 50 + innerRadius * Math.sin((segment.startAngle * Math.PI) / 180);
                const x4 = 50 + innerRadius * Math.cos((segment.endAngle * Math.PI) / 180);
                const y4 = 50 + innerRadius * Math.sin((segment.endAngle * Math.PI) / 180);
                
                const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
                
                return (
                  <path
                    key={index}
                    d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x3} ${y3} Z`}
                    fill={segment.color}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center transform rotate-90">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-sm text-gray-700">
                {segment.label}: {segment.value} ({segment.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
      <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {title}
      </h3>
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <p className="text-gray-500">Chart type "{type}" is not supported</p>
      </div>
    </div>
  );
};

export default AnalyticsChart;
