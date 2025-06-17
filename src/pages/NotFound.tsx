
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileX, Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto px-4 py-8 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-48 h-48 rounded-full bg-interview-primary"></div>
          </div>
          <FileX className="w-24 h-24 mx-auto text-interview-primary" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('page_not_found')}</h2>
        <p className="text-gray-600 mb-8">
          {t('page_not_found_desc')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              {t('return_home')}
            </Link>
          </Button>
          <Button 
            className="w-full sm:w-auto bg-interview-primary hover:bg-interview-secondary flex items-center justify-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('go_back')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
