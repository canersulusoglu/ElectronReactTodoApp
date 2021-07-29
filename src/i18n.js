import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, tr } from './languages';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en,
      tr
    },
    fallbackLng: navigator.language,
    debug: false,
    //keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    react: {
      wait: true
    }
  });
export default i18n;