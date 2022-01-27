import { render } from 'preact';
import { App } from './app';
import './index.css';

import en from '../i18n/en.json';
import zhCN from '../i18n/zh-CN.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      'zh-CN': {
        translation: zhCN,
      },
    },
    fallbackLng: 'en',
    debug: /localhost/i.test(location.hostname),
    detection: {
      // localStorage is default
      lookupLocalStorage: 'locale',
      lookupCookie: 'locale',
    },
    interpolation: {
      escapeValue: false, // not needed for React
    },
  })
  .then((t) => {
    console.log(i18n);
    const updateLocale = () => {
      document.documentElement.lang = i18n.resolvedLanguage;
      document.title = document.querySelector('meta[name="title"]').content =
        t('app.title');
      document.querySelector('meta[name="description"]').content =
        t('app.description');
    };
    i18n.on('languageChanged', updateLocale);
    updateLocale();
  });

render(<App />, document.getElementById('app'));
