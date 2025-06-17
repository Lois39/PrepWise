
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('privacy_policy')}</h1>
            <p className="text-gray-600">{t('last_updated')}: April 15, 2025</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p>
                {t('privacy_intro')}
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('information_collect')}</h2>
              <p>
                {t('information_collect_desc')}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>{t('personal_info')}</li>
                <li>{t('account_credentials')}</li>
                <li>{t('payment_info')}</li>
                <li>{t('interview_recordings')}</li>
                <li>{t('feedback')}</li>
                <li>{t('communications')}</li>
              </ul>
              
              <p>
                {t('auto_collect')}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>{t('device_info')}</li>
                <li>{t('usage_patterns')}</li>
                <li>{t('ip_address')}</li>
                <li>{t('referral_sources')}</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('how_use_info')}</h2>
              <p>
                {t('use_info_desc')}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>{t('providing_services')}</li>
                <li>{t('processing_transactions')}</li>
                <li>{t('personalizing_experience')}</li>
                <li>{t('analyzing_patterns')}</li>
                <li>{t('training_ai')}</li>
                <li>{t('communicating_updates')}</li>
                <li>{t('responding_inquiries')}</li>
                <li>{t('protecting_fraud')}</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('info_sharing')}</h2>
              <p>
                {t('sharing_circumstances')}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>{t('service_providers')}</li>
                <li>{t('legal_obligations')}</li>
                <li>{t('business_transaction')}</li>
                <li>{t('with_consent')}</li>
              </ul>
              <p>
                {t('no_sell_info')}
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('data_security')}</h2>
              <p>
                {t('security_measures')}
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('your_rights')}</h2>
              <p>
                {t('rights_desc')}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>{t('accessing_info')}</li>
                <li>{t('correcting_info')}</li>
                <li>{t('deleting_info')}</li>
                <li>{t('restricting_processing')}</li>
                <li>{t('data_portability')}</li>
                <li>{t('withdrawing_consent')}</li>
              </ul>
              <p>
                {t('exercise_rights')}
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('policy_changes')}</h2>
              <p>
                {t('update_policy')}
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">{t('contact_us')}</h2>
              <p>
                {t('questions_concerns')}
              </p>
              <p className="mt-2">
                {t('email')}: privacy@prepwise.com<br />
                {t('address')}: 123 PrepWise Avenue, San Francisco, CA 94103, United States<br />
                {t('phone')}: +1-800-123-4567
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
