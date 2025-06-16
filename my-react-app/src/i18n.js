// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/locales/en/translation.json';
import translationVI from '../src/locales/vn/translation.json';

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // mặc định là English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
