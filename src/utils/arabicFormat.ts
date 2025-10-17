/**
 * Utility functions for Arabic-specific formatting
 */

// Arabic numerals mapping
const ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Convert Western numerals to Arabic numerals
 * @param num The number to convert
 * @returns The number with Arabic numerals
 */
export const toArabicNumerals = (num: number | string): string => {
  return String(num).replace(/\d/g, (digit) => ARABIC_NUMERALS[parseInt(digit, 10)]);
};

/**
 * Format a number with Arabic numerals and proper grouping
 * @param num The number to format
 * @returns The formatted number with Arabic numerals
 */
export const formatArabicNumber = (num: number): string => {
  // Group by thousands (Arabic convention)
  const formatted = new Intl.NumberFormat('ar-EG').format(num);
  return formatted;
};

/**
 * Format a date in Arabic format
 * @param date The date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns The formatted date in Arabic
 */
export const formatArabicDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat('ar-EG', defaultOptions).format(date);
};

/**
 * Format a date and time in Arabic format
 * @param date The date to format
 * @returns The formatted date and time in Arabic
 */
export const formatArabicDateTime = (date: Date): string => {
  return formatArabicDate(date, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

/**
 * Format currency in Arabic format
 * @param amount The amount to format
 * @param currency The currency code (default: 'EGP')
 * @returns The formatted currency in Arabic
 */
export const formatArabicCurrency = (
  amount: number,
  currency: string = 'EGP'
): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Format a percentage in Arabic format
 * @param value The value to format as percentage
 * @returns The formatted percentage in Arabic
 */
export const formatArabicPercentage = (value: number): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};
