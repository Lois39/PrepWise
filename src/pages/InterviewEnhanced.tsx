
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import InterviewSimulator from "@/components/InterviewSimulator";
import CalendarScheduler from "@/components/CalendarScheduler";
import CommunityForum from "@/components/CommunityForum";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import JobRoleSelector from "@/components/JobRoleSelector";
import { Card, CardContent } from "@/components/ui/card";
import PanelInterview from "@/components/PanelInterview";
import CustomQuestionBank from "@/components/CustomQuestionBank";
import { Button } from "@/components/ui/button";
import { Users, User, MessageSquare } from "lucide-react";

const InterviewEnhanced = () => {
  const { t } = useLanguage();
  const [interviewType, setInterviewType] = useState("behavioral"); // Default interview type
  const [jobRole, setJobRole] = useState("");
  const [showJobSelector, setShowJobSelector] = useState(true);
  const [interviewMode, setInterviewMode] = useState<"single" | "panel">("single");
  const [activeTab, setActiveTab] = useState("practice");

  const handleSelectRole = (role: string) => {
    setJobRole(role);
    setShowJobSelector(false);
  };

  const handleResetJob = () => {
    setShowJobSelector(true);
    setJobRole("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{t('practice_interview')} | PrepWise</title>
        <meta name="description" content={t('practice_interview_desc')} />
      </Helmet>

      <div className="relative">
        <div className="absolute right-4 top-4 z-50">
          <LanguageSelector />
        </div>
        <Header />
      </div>
      
      <main className="container mx-auto py-10 px-4 animate-fade-in">
        <section className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-blue animate-slide-in-up">
              {t("practice")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-in-up animation-delay-200">
              {t("comprehensive_prep")}
            </p>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex justify-center w-full max-w-2xl mx-auto bg-gray-100 p-1 rounded-full">
              <TabsTrigger value="practice" className="flex-1 rounded-full py-3">
                {t('practice_interview')}
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex-1 rounded-full py-3">
                {t('questions')}
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1 rounded-full py-3">
                {t('schedule')}
              </TabsTrigger>
              <TabsTrigger value="community" className="flex-1 rounded-full py-3">
                {t('community')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="practice" className="mt-6 animate-fade-in">
              {showJobSelector ? (
                <JobRoleSelector onSelectRole={handleSelectRole} />
              ) : (
                <div className="mb-6 space-y-6">
                  <Card className="bg-white shadow-sm border-interview-light mb-4">
                    <CardContent className="flex justify-between items-center py-4">
                      <div>
                        <span className="text-sm text-gray-500">{t('selected_role')}:</span>
                        <h3 className="text-lg font-medium">{jobRole}</h3>
                      </div>
                      <button 
                        onClick={handleResetJob}
                        className="text-interview-primary hover:underline text-sm font-medium"
                      >
                        {t('change_role')}
                      </button>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-center space-x-4 mb-6">
                    <Button 
                      variant={interviewMode === "single" ? "default" : "outline"}
                      className={interviewMode === "single" ? "bg-interview-primary" : ""}
                      onClick={() => setInterviewMode("single")}
                    >
                      <User className="h-4 w-4 mr-2" /> 
                      {t('single_interviewer')}
                    </Button>
                    <Button 
                      variant={interviewMode === "panel" ? "default" : "outline"}
                      className={interviewMode === "panel" ? "bg-interview-primary" : ""}
                      onClick={() => setInterviewMode("panel")}
                    >
                      <Users className="h-4 w-4 mr-2" /> 
                      {t('panel_interview')}
                    </Button>
                  </div>
                  
                  {interviewMode === "single" ? (
                    <InterviewSimulator interviewType={interviewType} jobRole={jobRole} />
                  ) : (
                    <PanelInterview jobRole={jobRole} />
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="questions" className="mt-6 animate-fade-in">
              <CustomQuestionBank 
                jobRole={jobRole} 
                onSelectQuestion={(question) => {
                  console.log("Selected question:", question);
                  setActiveTab("practice");
                  // In a real implementation, this would pass the question to the interview simulator
                }}
              />
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6 animate-fade-in">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-interview-light to-interview-primary/10 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">{t('schedule_sessions')}</h2>
                  <p className="text-gray-600 mt-2">{t('schedule_description')}</p>
                </div>
                <div className="p-6">
                  <Tabs defaultValue="scheduler">
                    <TabsContent value="scheduler" className="mt-0">
                      <CalendarScheduler />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="mt-6 animate-fade-in">
              <CommunityForum />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewEnhanced;
