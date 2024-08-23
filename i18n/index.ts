'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationEn } from '@/i18n/translation-en';
import { translationUa } from '@/i18n/translation-ua';

export const resources = {
  en: {
    translation: translationEn,
  },
  ua: {
    translation: translationUa
  }
};

const lng = localStorage.getItem('lang') || 'en';

 i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

 export default i18n;
