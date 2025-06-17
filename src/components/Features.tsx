
import { 
  Brain, 
  BarChart3, 
  Book, 
  FileText, 
  Users, 
  Clock, 
  ThumbsUp 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-interview-primary" />,
      title: "AI-Powered Feedback",
      description: "Receive instant, detailed feedback on your interview responses from our advanced AI system."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-interview-primary" />,
      title: "Performance Analytics",
      description: "Track your progress over time with comprehensive reports and performance metrics."
    },
    {
      icon: <Book className="h-10 w-10 text-interview-primary" />,
      title: "Question Bank",
      description: "Access thousands of real interview questions across various industries and job roles."
    },
    {
      icon: <FileText className="h-10 w-10 text-interview-primary" />,
      title: "Personalized Reports",
      description: "Get detailed reports highlighting your strengths and areas for improvement."
    },
    {
      icon: <Users className="h-10 w-10 text-interview-primary" />,
      title: "Industry Experts",
      description: "Questions and evaluation criteria developed by hiring managers and industry professionals."
    },
    {
      icon: <Clock className="h-10 w-10 text-interview-primary" />,
      title: "Practice Anytime",
      description: "24/7 access to interview practice sessions from the comfort of your home."
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="interview-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features to Enhance Your Interview Skills
          </h2>
          <p className="text-xl text-gray-600">
            Our comprehensive platform provides everything you need to prepare for and excel in your next interview.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-lg bg-interview-light">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="bg-interview-background rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex-1 lg:pr-12 mb-8 lg:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  How It Works
                </h3>
                <p className="text-gray-600 mb-6">
                  Our platform makes interview preparation simple and effective. Follow these steps to start improving your interview skills today.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Choose an interview type",
                      description: "Select from various job roles, industries, or specific skill assessments."
                    },
                    {
                      step: "2",
                      title: "Answer interview questions",
                      description: "Respond to tailored questions just like you would in a real interview."
                    },
                    {
                      step: "3",
                      title: "Receive AI feedback",
                      description: "Get instant evaluation and suggestions to improve your responses."
                    },
                    {
                      step: "4",
                      title: "Track your progress",
                      description: "Monitor your improvement over time with detailed analytics."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-interview-primary text-white font-medium">
                          {item.step}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-5 w-5 text-interview-primary" />
                        <h4 className="font-medium">Performance Summary</h4>
                      </div>
                      <span className="text-sm text-gray-500">Today</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Content Quality</span>
                          <span className="text-sm font-medium text-interview-primary">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-interview-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Delivery & Clarity</span>
                          <span className="text-sm font-medium text-interview-primary">72%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-interview-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Structure</span>
                          <span className="text-sm font-medium text-interview-primary">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-interview-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Relevance</span>
                          <span className="text-sm font-medium text-interview-primary">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-interview-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">AI Recommendations:</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mr-2 mt-0.5">•</div>
                          <span>Include more specific examples in your responses</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mr-2 mt-0.5">•</div>
                          <span>Work on maintaining a consistent pace of speech</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mr-2 mt-0.5">•</div>
                          <span>Great use of the STAR method in your answers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 bg-interview-light w-20 h-20 rounded-full opacity-70 blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 bg-interview-light w-16 h-16 rounded-full opacity-70 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
