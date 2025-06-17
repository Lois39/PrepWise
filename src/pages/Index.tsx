
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import ProgressDashboard from '../components/ProgressDashboard';
import { useIsMobile } from '../hooks/use-mobile';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, FileText, BarChart, Brain, Calendar, User } from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('features');
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {user && (
          <div className="bg-gray-50 py-12">
            <div className="interview-container">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back, {user.user_metadata?.name || 'Candidate'}</h2>
                <p className="text-gray-600">Continue your interview preparation journey</p>
              </div>
              
              <ProgressDashboard />
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="h-5 w-5 mr-2 text-interview-primary" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-3 bg-interview-light rounded-md">
                        <p className="font-medium">Technical Interview Practice</p>
                        <p className="text-sm text-gray-600">Tomorrow, 3:00 PM</p>
                      </div>
                      <div className="p-3 border border-dashed border-gray-200 rounded-md">
                        <Button variant="link" className="p-0 h-auto text-interview-primary">
                          + Schedule New Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="h-5 w-5 mr-2 text-interview-primary" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Completed Behavioral Interview</span>
                      </div>
                      <div className="flex items-center p-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span>Updated Resume</span>
                      </div>
                      <div className="flex items-center p-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <span>Received Feedback on Response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Brain className="h-5 w-5 mr-2 text-interview-primary" />
                      Recommended Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Video Response Practice
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Leadership Question Set
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        <div className="py-12">
          <div className="interview-container">
            <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <div className="flex justify-center">
                <TabsList className={isMobile ? "grid grid-cols-2 w-full" : "grid grid-cols-3 w-[600px]"}>
                  <TabsTrigger value="features" className="text-base">
                    Key Features
                  </TabsTrigger>
                  <TabsTrigger value="how-it-works" className="text-base">
                    How It Works
                  </TabsTrigger>
                  {!isMobile && (
                    <TabsTrigger value="new-features" className="text-base">
                      New Features
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              
              <TabsContent value="features">
                <Features />
              </TabsContent>
              
              <TabsContent value="how-it-works">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-12">How PrepWise Works</h2>
                  
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <h3 className="text-xl font-semibold mb-3">1. Upload Your Job Description</h3>
                        <p className="text-gray-600 mb-4">
                          Start by uploading a specific job description you're interested in. Our AI analyzes the key requirements and responsibilities.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Extracts important skills and qualifications</span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Identifies company culture and values</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2 bg-gray-100 rounded-xl p-6 order-1 md:order-2">
                        <FileText className="h-12 w-12 text-interview-primary mx-auto mb-4" />
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700">
                            "Looking for a Senior Product Manager with 5+ years of experience in SaaS products. Strong analytical skills and experience with agile methodologies required..."
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/2 bg-gray-100 rounded-xl p-6">
                        <Video className="h-12 w-12 text-interview-primary mx-auto mb-4" />
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="bg-gray-50 p-2 rounded mb-2">
                            <p className="text-sm font-medium">Tell me about a time when you used data to drive a product decision?</p>
                          </div>
                          <p className="text-sm text-gray-700">
                            "In my previous role, I noticed our user engagement metrics were declining..."
                          </p>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold mb-3">2. Practice with AI-Generated Questions</h3>
                        <p className="text-gray-600 mb-4">
                          Based on the job description, our AI generates tailored interview questions that simulate what you'll likely face in the actual interview.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Questions match the seniority level and role specifics</span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Practice through text, audio, or video formats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <h3 className="text-xl font-semibold mb-3">3. Receive Structured Feedback</h3>
                        <p className="text-gray-600 mb-4">
                          After each response, get comprehensive feedback based on the STAR method and industry best practices.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Analysis of content, structure, and delivery</span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                              <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                            </div>
                            <span className="text-gray-700">Specific improvement suggestions for each answer</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2 bg-gray-100 rounded-xl p-6 order-1 md:order-2">
                        <BarChart className="h-12 w-12 text-interview-primary mx-auto mb-4" />
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex mb-2">
                            <div className="w-1/4 h-2 bg-green-500 rounded-l"></div>
                            <div className="w-3/4 h-2 bg-gray-200 rounded-r"></div>
                          </div>
                          <p className="text-sm text-gray-700">
                            "Your response effectively described the situation, but could be improved by highlighting specific metrics and outcomes..."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="new-features">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-12">New Features</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-2 border-interview-primary overflow-hidden">
                      <div className="bg-interview-primary text-white px-4 py-1 text-sm font-medium">
                        NEW
                      </div>
                      <CardHeader>
                        <CardTitle>Job Description Analysis</CardTitle>
                        <CardDescription>
                          Get tailored questions based on actual job descriptions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Upload real job postings and receive customized interview questions that directly address the specific requirements and responsibilities mentioned.
                        </p>
                        <Button className="bg-interview-primary hover:bg-interview-secondary text-white">
                          Try It Now
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-interview-primary overflow-hidden">
                      <div className="bg-interview-primary text-white px-4 py-1 text-sm font-medium">
                        NEW
                      </div>
                      <CardHeader>
                        <CardTitle>STAR Method Feedback</CardTitle>
                        <CardDescription>
                          Structured analysis of your interview responses
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Receive detailed feedback on how well your responses follow the STAR method (Situation, Task, Action, Result), with specific improvements for each component.
                        </p>
                        <Button className="bg-interview-primary hover:bg-interview-secondary text-white">
                          See Example
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Video Response Analysis</CardTitle>
                        <CardDescription>
                          Practice with video recording and get feedback on your delivery
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Record your interview responses on video and receive AI feedback on your body language, tone, pacing, and verbal communication.
                        </p>
                        <Button variant="outline">
                          Coming Soon
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Progress Dashboard</CardTitle>
                        <CardDescription>
                          Track your improvement over time with detailed analytics
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Monitor your progress across different interview types, see improvement trends, and identify areas that need more practice.
                        </p>
                        <Button variant="outline">
                          Explore
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
