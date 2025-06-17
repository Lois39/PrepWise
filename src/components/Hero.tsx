
import { Button } from '@/components/ui/button';
import { FileText, PlayCircle, ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DemoModal from './DemoModal';

const Hero = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  return (
    <div className="relative bg-interview-background pb-20 pt-16 lg:pt-24">
      <div className="interview-container">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="max-w-2xl lg:max-w-xl lg:pr-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-interview-primary">Ace Your Next Interview</span>{' '}
              with AI-Powered Feedback
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice interviews with our smart AI assistant, receive real-time feedback on your responses, and improve your interview skills with personalized coaching.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-interview-primary hover:bg-interview-secondary text-white px-8 py-6 text-lg font-medium rounded-lg flex items-center"
                asChild
              >
                <Link to="/interview">
                  Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-interview-primary text-interview-primary hover:bg-interview-light px-8 py-6 text-lg font-medium rounded-lg flex items-center"
                onClick={() => setIsDemoModalOpen(true)}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    style={{ 
                      backgroundColor: `hsl(${200 + i * 10}, 85%, 55%)`,
                      zIndex: 5 - i
                    }}
                  />
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-interview-primary">10,000+</span> people have improved their interview skills
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 mt-12 lg:mt-0 max-w-xl lg:max-w-none">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg transform rotate-1 animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="bg-interview-light p-2 rounded-lg">
                        <FileText className="h-6 w-6 text-interview-primary" />
                      </div>
                      <h3 className="font-medium">Interview Simulator</h3>
                    </div>
                    <div className="bg-green-100 px-2 py-1 rounded-full text-xs text-green-700 font-medium">
                      Live
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800 font-medium">Tell me about a time when you had to work under pressure to meet a deadline.</p>
                    </div>
                    
                    <div className="bg-interview-light p-4 rounded-lg">
                      <p className="text-gray-800">In my previous role, our team was tasked with delivering a client project a week ahead of schedule...</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-interview-primary p-1.5 rounded-full">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium mb-1">AI Feedback</p>
                          <p className="text-gray-600 text-sm">Great example! Consider adding more details about the specific actions you took to meet the deadline.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-interview-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">Question 3 of 4</span>
                      <span className="text-xs font-medium text-interview-primary">75% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 bg-interview-accent w-24 h-24 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 bg-interview-primary w-32 h-32 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Hero;
