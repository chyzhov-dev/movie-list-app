'use client';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { useCallback } from 'react';

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const switchLanguage = useCallback(() => {
      const isEng = i18n.language === 'en';
      const newLang = isEng ? 'ua' : 'en';
      i18n.changeLanguage(newLang);
      localStorage.setItem('lang', newLang);
    }
  , [i18n])

  return (
    <Button onClick={switchLanguage}>
      <span className="text-2xl">
        {i18n.language === 'en' ? '🇺🇸' : '🇺🇦'}
      </span>
    </Button>
  )
}