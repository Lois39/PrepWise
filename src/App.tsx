
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Interview from "./pages/Interview";
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AuthCallback from "./pages/AuthCallback";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import Tips from "./pages/Tips";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Feedback from "./pages/Feedback";
import Community from "./pages/Community";
import Schedule from "./pages/Schedule";
import ResumeBuilder from "./pages/ResumeBuilder";
import LiveChat from "./components/LiveChat";

const App = () => {
  // Create a client instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/tips" element={<Tips />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route 
                    path="/interview" 
                    element={
                      <ProtectedRoute>
                        <Interview />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/questions" 
                    element={
                      <ProtectedRoute>
                        <Questions />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/results" 
                    element={
                      <ProtectedRoute>
                        <Results />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/community" 
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/schedule" 
                    element={
                      <ProtectedRoute>
                        <Schedule />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/resume-builder" 
                    element={
                      <ProtectedRoute>
                        <ResumeBuilder />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <LiveChat />
              </BrowserRouter>
            </LanguageProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
