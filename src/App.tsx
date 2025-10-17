import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from './hooks/useRTL';
import LanguageSelector from './components/settings/LanguageSelector';
import ArabicTextInput from './components/shared/ArabicTextInput';
import ArabicFormatDemo from './components/shared/ArabicFormatDemo';

function App() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [textInput, setTextInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <header className="bg-primary-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <LanguageSelector />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.welcome')}</h2>
          <p className="text-gray-600 mb-4">
            {t('dashboard.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">{t('dashboard.features.campaigns.title')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.features.campaigns.description')}</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">{t('dashboard.features.analytics.title')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.features.analytics.description')}</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">{t('dashboard.features.scheduling.title')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.features.scheduling.description')}</p>
            </div>
          </div>
        </div>

        {/* Arabic Text Input Demo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Arabic Text Input Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArabicTextInput
              label="Text Input"
              value={textInput}
              onChange={setTextInput}
              placeholder={isRTL ? 'اكتب النص هنا' : 'Type text here'}
            />
            <ArabicTextInput
              label="Text Area"
              value={textareaInput}
              onChange={setTextareaInput}
              placeholder={isRTL ? 'اكتب النص الطويل هنا' : 'Type long text here'}
              type="textarea"
              rows={4}
            />
          </div>
        </div>

        {/* Arabic Formatting Demo */}
        <ArabicFormatDemo />
      </main>
    </div>
  );
}

export default App;
