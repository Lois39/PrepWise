
import React from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";

const HeaderWrapper: React.FC = () => {
  // We need to use the language context properly
  const { language, t } = useLanguage();
  
  return (
    <div className="relative">
      <Header />
    </div>
  );
};

export default HeaderWrapper;
