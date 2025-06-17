
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
}

export function AuthLayout({ children, title, description, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-interview-background to-white">
      <div className="hidden lg:flex lg:w-1/2 bg-interview-primary items-center justify-center">
        <div className="max-w-md p-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Prepwise</h1>
          <p className="text-xl mb-8">Prepare smarter, succeed faster with AI-powered interview training that adapts to your needs.</p>
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Personalized Feedback</h3>
                <p className="text-white/80">Get detailed analysis of your interview responses in real-time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Industry Specific</h3>
                <p className="text-white/80">Practice with questions tailored to your field and experience level.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Skill Development</h3>
                <p className="text-white/80">Track your progress and improve your interviewing skills over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-interview-primary" />
            <span className="text-xl font-bold text-gray-800">Prepwise</span>
          </Link>
          <div className="flex space-x-4">
            {window.location.pathname === "/sign-in" ? (
              <Link to="/sign-up" className="text-sm font-medium text-interview-primary hover:text-interview-secondary">
                Create an account
              </Link>
            ) : (
              <Link to="/sign-in" className="text-sm font-medium text-interview-primary hover:text-interview-secondary">
                Sign in
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 max-w-md mx-auto w-full">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-base text-gray-600">
              {description}
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full">
            <div className="bg-white px-6 py-8 shadow-lg sm:rounded-xl border border-gray-100">
              {children}
            </div>
            {footer && (
              <div className="mt-6 text-center text-sm text-gray-600">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
