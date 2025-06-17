
import React, { createContext, useState, useContext, useEffect } from "react";
import { translate, TRANSLATIONS, LANGUAGES } from "@/components/LanguageSelector";

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  availableLanguages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: LANGUAGES,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    // Load saved language preference on component mount
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const handleSetLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("preferredLanguage", newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Enhanced translation function that supports variable substitution
  const t = (key: string, variables?: Record<string, string | number>): string => {
    let translatedText = translate(key, language);
    
    // Replace variables if provided
    if (variables) {
      Object.entries(variables).forEach(([varName, varValue]) => {
        translatedText = translatedText.replace(new RegExp(`{{${varName}}}`, 'g'), String(varValue));
      });
    }
    
    return translatedText;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t,
      availableLanguages: LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
