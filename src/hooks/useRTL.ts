import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useRTL = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML dir attribute for RTL/LTR support
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add RTL class to body for additional styling
    if (i18n.language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);

  const isRTL = i18n.language === 'ar';
  
  return { isRTL, language: i18n.language };
};
