import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import {
  formatArabicNumber,
  formatArabicDate,
  formatArabicDateTime,
  formatArabicCurrency,
  formatArabicPercentage,
  toArabicNumerals
} from '../../utils/arabicFormat';

const ArabicFormatDemo: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const currentDate = new Date();
  const sampleNumber = 1234567;
  const sampleCurrency = 1500.50;
  const samplePercentage = 0.75;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {t('common.arabicFormatting', 'Arabic Formatting Examples')}
      </h3>
      
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h4 className="font-medium text-gray-700 mb-2">
            {t('common.numbers', 'Numbers')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Western:</span>
              <span className="ml-2 font-mono">{sampleNumber.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Arabic:</span>
              <span className="ml-2 font-mono">{formatArabicNumber(sampleNumber)}</span>
            </div>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium text-gray-700 mb-2">
            {t('common.dates', 'Dates')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Date:</span>
              <span className="ml-2">{formatArabicDate(currentDate)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">DateTime:</span>
              <span className="ml-2">{formatArabicDateTime(currentDate)}</span>
            </div>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium text-gray-700 mb-2">
            {t('common.currency', 'Currency')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Amount:</span>
              <span className="ml-2">{formatArabicCurrency(sampleCurrency)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">USD:</span>
              <span className="ml-2">{formatArabicCurrency(sampleCurrency, 'USD')}</span>
            </div>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium text-gray-700 mb-2">
            {t('common.percentage', 'Percentage')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Value:</span>
              <span className="ml-2">{formatArabicPercentage(samplePercentage)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Arabic Numerals:</span>
              <span className="ml-2">{toArabicNumerals('75%')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabicFormatDemo;
