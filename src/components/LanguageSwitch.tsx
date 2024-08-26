'use client';
import { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const languageMap: Record<string, string> = {
  en: '🇺🇸',
  ua: '🇺🇦',
};

export const LanguageSwitch = (): ReactElement => {
  const { i18n } = useTranslation();

  const switchLanguage = useCallback(() => {
    const isEng = i18n.language === 'en';
    const newLang = isEng ? 'ua' : 'en';

    void i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  }, [i18n]);

  return (
    <div
      className="flex justify-center items-center cursor-pointer select-none px-6 py-4 hover:animate-pulse"
      onClick={switchLanguage}
    >
      <span className="text-2xl">
        {languageMap[i18n.language]}
      </span>
    </div>
  );
};
