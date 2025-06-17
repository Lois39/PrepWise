
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Video, UserCheck, ChevronRight } from 'lucide-react';

const Guides = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('guides')}</h1>
            <p className="text-xl text-gray-600">{t('guides_description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: t('technical_guides'),
                description: t('technical_guides_desc'),
                icon: <FileText className="h-10 w-10 text-interview-primary" />,
                items: [
                  t('data_structures'),
                  t('system_design'),
                  t('frontend_dev'),
                  t('backend_tech'),
                  t('devops_questions')
                ]
              },
              {
                title: t('behavioral_guides'),
                description: t('behavioral_guides_desc'),
                icon: <UserCheck className="h-10 w-10 text-interview-primary" />,
                items: [
                  t('situational_questions'),
                  t('teamwork_examples'),
                  t('leadership_scenarios'),
                  t('conflict_resolution'),
                  t('problem_solving')
                ]
              },
              {
                title: t('industry_guides'),
                description: t('industry_guides_desc'),
                icon: <BookOpen className="h-10 w-10 text-interview-primary" />,
                items: [
                  t('software_engineering'),
                  t('data_science'),
                  t('product_management'),
                  t('marketing'),
                  t('sales_business')
                ]
              },
              {
                title: t('video_tips'),
                description: t('video_tips_desc'),
                icon: <Video className="h-10 w-10 text-interview-primary" />,
                items: [
                  t('setting_up_space'),
                  t('body_language'),
                  t('tech_preparation'),
                  t('virtual_whiteboarding'),
                  t('followup')
                ]
              }
            ].map((category, i) => (
              <Card key={i} className="border-t-4 border-t-interview-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-start">
                    <div className="mr-4">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-center cursor-pointer hover:text-interview-primary transition-colors">
                        <ChevronRight className="h-4 w-4 mr-2 text-interview-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
