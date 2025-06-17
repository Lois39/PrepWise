
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Careers = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('careers_at_prepwise')}</h1>
            <p className="text-xl text-gray-600">{t('join_team')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('why_work_with_us')}</h2>
              <p className="text-gray-700 mb-4">
                {t('careers_mission')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{t('flexible_remote')}</li>
                <li>{t('competitive_compensation')}</li>
                <li>{t('unlimited_pto')}</li>
                <li>{t('health_benefits')}</li>
                <li>{t('professional_development')}</li>
                <li>{t('team_retreats')}</li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 md:h-auto"></div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('open_positions')}</h2>
            
            <div className="space-y-6">
              {[
                { 
                  title: t('senior_frontend_engineer'),
                  department: t('engineering'),
                  location: t('remote'),
                  type: t('full_time')
                },
                { 
                  title: t('machine_learning_engineer'),
                  department: t('ai_team'),
                  location: t('remote'),
                  type: t('full_time')
                },
                { 
                  title: t('product_designer'),
                  department: t('design'),
                  location: t('remote'),
                  type: t('full_time')
                },
                { 
                  title: t('content_marketing_specialist'),
                  department: t('marketing'),
                  location: t('remote'),
                  type: t('contract')
                }
              ].map((job, index) => (
                <div key={index} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{job.department}</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{job.location}</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{job.type}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-4 py-2 bg-interview-primary hover:bg-interview-secondary text-white rounded-md">
                      {t('apply_now')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
