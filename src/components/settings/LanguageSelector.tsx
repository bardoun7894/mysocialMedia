import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { isRTL } = useRTL();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'ar'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'en'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSelector;
