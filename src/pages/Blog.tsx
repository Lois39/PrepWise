
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Blog = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('blog')}</h1>
            <p className="text-xl text-gray-600">{t('career_advice')}, {t('industry_insights')}, {t('interview_tips')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <p className="text-sm text-interview-primary font-medium mb-2">
                    {[
                      t('interview_tips'), 
                      t('career_growth'), 
                      t('job_search'), 
                      t('industry_trends'), 
                      t('personal_development'), 
                      t('success_stories')
                    ][i % 6]}
                  </p>
                  <h3 className="text-xl font-semibold mb-3">
                    {[
                      t('ten_questions_prepare'),
                      t('stand_out_tech_interviews'),
                      t('negotiating_salary'),
                      t('building_personal_brand'),
                      t('common_interview_mistakes'),
                      t('rejection_to_offer')
                    ][i % 6]}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('lorem_ipsum')}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">May {i + 10}, 2023</span>
                    <span className="text-sm text-interview-primary font-medium cursor-pointer">{t('read_more')} →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
