import LocalizedStrings from 'react-localization';

import translationStrings from 'translations/translationStrings';
import LANGUAGE from 'config/language';
import STORAGE from 'helpers/storage';

const strings = new LocalizedStrings(translationStrings);

export const langLoad = () => {
  const isLang = LANGUAGE.some((item) => item.code.includes(STORAGE.getItem('lang')));
  if (STORAGE.isItem('lang') || isLang === false) {
    STORAGE.setItem('lang', LANGUAGE[0].code);
  } else {
    const langCode = STORAGE.getItem('lang');
    strings.setLanguage(langCode || LANGUAGE[0].code);
  }
};

export default strings;
