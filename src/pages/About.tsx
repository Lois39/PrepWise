
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Users, BookOpen, Award, CheckCircle, Calendar } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-interview-light py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About InterviewAI</h1>
              <p className="text-xl text-gray-700 mb-8">
                Revolutionizing the way professionals prepare for job interviews with AI-powered coaching and personalized feedback.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-interview-primary hover:bg-interview-secondary">
                  <Link to="/interview">Try Interview Simulator</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/questions">Explore Question Bank</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                At InterviewAI, we believe everyone deserves access to high-quality interview preparation. 
                Our platform harnesses the power of artificial intelligence to provide personalized coaching 
                and feedback, helping job seekers perform at their best during interviews.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-interview-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Everyone</h3>
                <p className="text-gray-600">
                  Whether you're a recent graduate or a seasoned professional, our platform adapts to your needs and skill level.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Brain className="h-12 w-12 text-interview-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes your responses and provides actionable feedback to help you improve.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-interview-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Insights</h3>
                <p className="text-gray-600">
                  Our question bank and feedback systems are developed with input from industry professionals and hiring managers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How InterviewAI Works</h2>
              <p className="text-lg text-gray-700">
                Our platform offers a comprehensive approach to interview preparation,
                giving you all the tools you need to succeed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-interview-light text-interview-primary font-bold">1</div>
                <h3 className="text-xl font-semibold">Select Your Job Role</h3>
                <p className="text-gray-600 text-center md:text-left">
                  Choose your industry and position to get tailored interview questions and guidance.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-interview-light text-interview-primary font-bold">2</div>
                <h3 className="text-xl font-semibold">Practice With AI Interviews</h3>
                <p className="text-gray-600 text-center md:text-left">
                  Engage in realistic interview simulations with our AI interviewer, complete with video and audio recording.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-interview-light text-interview-primary font-bold">3</div>
                <h3 className="text-xl font-semibold">Get Personalized Feedback</h3>
                <p className="text-gray-600 text-center md:text-left">
                  Receive detailed analysis of your answers with specific suggestions for improvement.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-interview-light text-interview-primary font-bold">4</div>
                <h3 className="text-xl font-semibold">Track Your Progress</h3>
                <p className="text-gray-600 text-center md:text-left">
                  Monitor your improvement over time and identify areas that need more attention.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InterviewAI</h2>
              <p className="text-lg text-gray-700">
                Our platform stands out with features designed to give you the best preparation experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-interview-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Comprehensive Question Bank</h3>
                    <p className="text-gray-600">
                      Access hundreds of real interview questions across different industries and job roles.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-interview-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Realistic Simulation</h3>
                    <p className="text-gray-600">
                      Practice in an environment that mimics real interview conditions, complete with time pressure.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-interview-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Advanced AI Analysis</h3>
                    <p className="text-gray-600">
                      Our AI evaluates not just what you say, but how you structure your responses and present your ideas.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-interview-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Accessible Anytime, Anywhere</h3>
                    <p className="text-gray-600">
                      Practice at your convenience from any device with an internet connection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-interview-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who have improved their interview skills with InterviewAI.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/sign-up">Create Your Free Account</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
