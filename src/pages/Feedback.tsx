
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, MessageSquare, Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Feedback</h1>
            <p className="text-xl text-gray-600">Get detailed insights to improve your interview performance</p>
          </div>
          
          <Tabs defaultValue="feedback" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="feedback" className="text-base">How It Works</TabsTrigger>
              <TabsTrigger value="examples" className="text-base">Feedback Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-interview-primary" />
                        Our AI Feedback Technology
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        PrepWise's AI feedback system analyzes your interview responses across multiple dimensions to provide comprehensive insights:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="font-medium mb-1">Content Analysis</h3>
                          <p className="text-sm text-gray-600">
                            Evaluates the substance of your answers, including relevance, completeness, and depth of knowledge.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="font-medium mb-1">Structure Assessment</h3>
                          <p className="text-sm text-gray-600">
                            Analyzes how well you organize your thoughts and whether you use frameworks like STAR effectively.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="font-medium mb-1">Communication Quality</h3>
                          <p className="text-sm text-gray-600">
                            Examines clarity, conciseness, and how effectively you communicate complex ideas.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="font-medium mb-1">Industry Alignment</h3>
                          <p className="text-sm text-gray-600">
                            Checks how well your answers align with industry-specific expectations and best practices.
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700">
                        Our AI has been trained on thousands of successful interview responses across various industries and job roles, allowing it to provide targeted, actionable feedback.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-interview-primary" />
                        What You'll Receive
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        After each practice interview question, you'll receive:
                      </p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                            <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                          </div>
                          <span className="text-gray-700">Overall performance score</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                            <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                          </div>
                          <span className="text-gray-700">Detailed analysis of strengths and weaknesses</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                            <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                          </div>
                          <span className="text-gray-700">Specific improvement suggestions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                            <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                          </div>
                          <span className="text-gray-700">Example responses and frameworks</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-interview-light p-1 rounded-full mr-3 mt-0.5">
                            <div className="h-3 w-3 rounded-full bg-interview-primary"></div>
                          </div>
                          <span className="text-gray-700">Performance trends over time</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-interview-primary text-white">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Ready to improve your interview skills?</h3>
                      <p className="mb-6">
                        Start practicing now and get personalized AI feedback to help you ace your next interview.
                      </p>
                      <Button variant="secondary" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Try a Practice Interview
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Example Question: Tell me about a time you faced a difficult challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-medium text-gray-800 mb-2">User Response</h3>
                      <p className="text-gray-700">
                        I had a difficult project at my last job where we needed to implement a new system with a tight deadline. We had issues with the integration, and I had to work overtime to fix the bugs. I coordinated with my team members and we managed to deliver it on time. The client was happy with the result even though we had some challenges during the implementation.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-800">AI Feedback</h3>
                        <div className="bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded font-medium">
                          Score: 65/100
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Your response addresses the question, but could be improved with more structure and specific details about the challenge and your actions.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">You mentioned a specific project scenario which helps contextualize your answer.</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">You acknowledged both the challenge and the successful outcome.</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsDown className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">Your response lacks specific details about the challenge and what actions you personally took to solve it.</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsDown className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">Try using the STAR method (Situation, Task, Action, Result) to better structure your response and include more details about your specific contributions.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-md">
                      <h3 className="font-medium text-green-800 mb-2">Improved Response Example</h3>
                      <p className="text-green-700">
                        <strong>Situation:</strong> At my previous company, we needed to implement a new CRM system that would integrate with our existing backend systems. We had a hard deadline of three weeks because of contractual obligations with a major client.<br /><br />
                        
                        <strong>Task:</strong> As the lead developer, I was responsible for ensuring the integration worked correctly and met all the client's requirements.<br /><br />
                        
                        <strong>Action:</strong> When we discovered compatibility issues between the new CRM and our legacy database, I first mapped out all the integration points and identified the critical issues. I then organized the team into specialized sub-groups to tackle each problem area. I personally focused on developing an API middleware solution that could translate between the two systems. I implemented daily stand-ups and created a tracking dashboard to monitor progress. When we hit a particularly difficult authentication issue, I reached out to the CRM vendor's technical team to collaborate on a solution.<br /><br />
                        
                        <strong>Result:</strong> We successfully delivered the integration one day ahead of schedule. The middleware solution I designed reduced data transfer errors by 95% compared to our initial attempts. The client was extremely satisfied, and our approach was documented as a best practice for similar projects in the future. Personally, this experience taught me the value of breaking down complex problems and the importance of clear communication during high-pressure situations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
