
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/LanguageContext";
import CalendarScheduler from "@/components/CalendarScheduler";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, CheckCircle2, Bell } from "lucide-react";

const Schedule = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{t('schedule_practice')} | PrepWise</title>
        <meta name="description" content={t('schedule_meta_description')} />
      </Helmet>

      <Header />
      <main className="container mx-auto py-10 px-4 animate-fade-in">
        <section className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-blue animate-slide-in-up">
                {t('schedule_sessions')}
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-200">
                {t('schedule_description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard 
                icon={<Calendar className="h-10 w-10 text-blue-500" />}
                title={t('schedule')}
                description={t('schedule_card_desc')}
              />
              <StatCard 
                icon={<Clock className="h-10 w-10 text-green-500" />}
                title={t('practice')}
                description={t('practice_card_desc')}
              />
              <StatCard 
                icon={<CheckCircle2 className="h-10 w-10 text-purple-500" />}
                title={t('track')}
                description={t('track_card_desc')}
              />
              <StatCard 
                icon={<Bell className="h-10 w-10 text-amber-500" />}
                title={t('remind')}
                description={t('remind_card_desc')}
              />
            </div>
          </div>

          <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-interview-primary/10 to-interview-light border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger value="calendar">{t('calendar_view')}</TabsTrigger>
                  <TabsTrigger value="list">{t('list_view')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <CardContent className="p-6">
              <Tabs value={activeTab}>
                <TabsContent value="calendar" className="mt-0">
                  <div className="bg-white rounded-lg">
                    <CalendarScheduler />
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    <ScheduleListItem 
                      title={t('behavioral_interview')}
                      date={t('tomorrow_time', { time: '10:00 AM' })}
                      type="behavioral"
                    />
                    <ScheduleListItem 
                      title={t('technical_interview')}
                      date={t('date_time', { date: 'May 6', time: '2:00 PM' })}
                      type="technical"
                    />
                    <ScheduleListItem 
                      title={t('mock_interview')}
                      date={t('date_time', { date: 'May 10', time: '9:00 AM' })}
                      type="mock"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({ icon, title, description }) => (
  <Card className="p-6 text-center hover:shadow-md transition-all duration-300 border-interview-light hover:border-interview-primary">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </Card>
);

const ScheduleListItem = ({ title, date, type }) => {
  const { t } = useLanguage();
  
  const getBgColor = () => {
    switch (type) {
      case "behavioral": return "bg-blue-100 text-blue-800";
      case "technical": return "bg-green-100 text-green-800";
      case "mock": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-all duration-200">
      <div className="flex items-center">
        <div className="mr-4">
          <Clock className="h-8 w-8 text-interview-primary" />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getBgColor()}`}>
          {t(type)}
        </span>
      </div>
    </div>
  );
};

export default Schedule;
