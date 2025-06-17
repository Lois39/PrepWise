
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText,
  Brain, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { useLanguage } from '@/context/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { LanguageSelector } from './LanguageSelector';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 site-header">
      <div className="interview-container h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center space-x-3">
            <Brain className="h-9 w-9 text-interview-primary" />
            <span className="text-2xl font-bold text-gray-700">PrepWise</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="text-gray-500 hover:text-interview-primary transition-colors text-base px-3 py-2">
                    {t('home')}
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white">{t('practice')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[240px] bg-white p-3">
                      <Link 
                        to="/interview" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('practice_interview')}
                      </Link>
                      <Link 
                        to="/questions" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('questions')}
                      </Link>
                      <Link 
                        to="/results" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('results')}
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white">{t('tools')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[240px] bg-white p-3">
                      <Link 
                        to="/resume-builder" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('resume_builder')}
                      </Link>
                      <Link 
                        to="/schedule" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('schedule')}
                      </Link>
                      <Link 
                        to="/community" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('community')}
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white">{t('resources')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[240px] bg-white p-3">
                      <Link 
                        to="/about" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('about')}
                      </Link>
                      <Link 
                        to="/blog" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('blog')}
                      </Link>
                      <Link 
                        to="/guides" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('guides')}
                      </Link>
                      <Link 
                        to="/tips" 
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-interview-primary" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('tips')}
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/pricing" className="text-gray-500 hover:text-interview-primary transition-colors text-base px-3 py-2">
                    {t('pricing')}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center space-x-4">
              {/* Language selector moved before profile button */}
              <div className="mr-2">
                <LanguageSelector />
              </div>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-interview-primary hover:text-white">
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4 mr-2" />
                      {t('profile')}
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-interview-primary hover:text-white">
                    <Link to="/sign-in">{t('sign_in')}</Link>
                  </Button>
                  <Button className="bg-interview-primary hover:bg-interview-secondary text-white">
                    <Link to="/sign-up">{t('get_started')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="text-gray-500"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block py-2.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
              {t('home')}
            </Link>
            
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">{t('practice')}</div>
              <div className="pl-3 space-y-1 border-l border-gray-200">
                <Link to="/interview" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('practice_interview')}
                </Link>
                <Link to="/questions" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('questions')}
                </Link>
                <Link to="/results" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('results')}
                </Link>
              </div>
            </div>
            
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">{t('tools')}</div>
              <div className="pl-3 space-y-1 border-l border-gray-200">
                <Link to="/resume-builder" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('resume_builder')}
                </Link>
                <Link to="/schedule" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('schedule')}
                </Link>
                <Link to="/community" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('community')}
                </Link>
              </div>
            </div>
            
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">{t('resources')}</div>
              <div className="pl-3 space-y-1 border-l border-gray-200">
                <Link to="/about" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('about')}
                </Link>
                <Link to="/blog" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('blog')}
                </Link>
                <Link to="/guides" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('guides')}
                </Link>
                <Link to="/tips" className="block py-1.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
                  {t('tips')}
                </Link>
              </div>
            </div>
            
            <Link to="/pricing" className="block py-2.5 text-gray-500 hover:text-interview-primary" onClick={() => setMobileMenuOpen(false)}>
              {t('pricing')}
            </Link>
            
            {/* Language selector placed before the profile button in mobile menu */}
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">{t('language')}</div>
              <div className="pl-3 border-l border-gray-200">
                <LanguageSelector />
              </div>
            </div>
            
            <div className="pt-2 flex flex-col space-y-3">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200 text-gray-600 hover:bg-interview-primary hover:text-white" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = "/profile";
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('profile')}
                </Button>
              ) : (
                <div className="pt-2 flex flex-col space-y-3">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-interview-primary hover:text-white">
                    <Link to="/sign-in" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                      {t('sign_in')}
                    </Link>
                  </Button>
                  <Button className="w-full bg-interview-primary hover:bg-interview-secondary text-white">
                    <Link to="/sign-up" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                      {t('get_started')}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
