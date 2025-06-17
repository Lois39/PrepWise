
import { Link } from 'react-router-dom';
import { Brain, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="interview-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-5 mt-8">
              <Brain className="h-7 w-7 text-interview-primary" />
              <span className="text-xl font-bold text-gray-800">PrepWise</span>
            </div>
            <p className="text-gray-600 mb-6">
              {t('footer_description')}
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-interview-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-interview-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-interview-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-interview-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 mt-8">
            <h3 className="font-semibold text-gray-800 mb-5">{t('features')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/interview" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('practice_interview')}
                </Link>
              </li>
              <li>
                <Link to="/questions" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('questions')}
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('performance_analytics')}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('ai_feedback')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 mt-8">
            <h3 className="font-semibold text-gray-800 mb-5">{t('resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('interview_guides')}
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('career_tips')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('faqs')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 mt-8">
            <h3 className="font-semibold text-gray-800 mb-5">{t('company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('about_us')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-interview-primary transition-colors">
                  {t('privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} PrepWise. {t('all_rights_reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
