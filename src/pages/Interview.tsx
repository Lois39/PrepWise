
import React from "react";
import InterviewEnhanced from "./InterviewEnhanced";
import HeaderWrapper from "@/components/HeaderWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet";

const Interview = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('practice_interview')} - PrepWise</title>
      </Helmet>
      <InterviewEnhanced />
    </>
  );
};

export default Interview;
