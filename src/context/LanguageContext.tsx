import React, { createContext, useContext, useState } from 'react';
import { Language, Currency } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (priceUsd: number) => string;
  formatPriceSqm: (usdSqm: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (priceUsd: number): string => {
    if (currency === 'USD') {
      return `$${priceUsd.toLocaleString('ru-RU')}`;
    }
    const kgs = Math.round(priceUsd * 88.0);
    return `${kgs.toLocaleString('ru-RU')} сом`;
  };

  const formatPriceSqm = (usdSqm: number): string => {
    if (currency === 'USD') {
      return `от ${usdSqm} $/м²`;
    }
    const kgs = Math.round(usdSqm * 88.0);
    return `от ${kgs.toLocaleString('ru-RU')} сом/м²`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        formatPriceSqm
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
