
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, Calendar, ArrowUpRight, Download, Share2, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { downloadMockReport } from '@/utils/downloadReportUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const performanceData = [
  { name: 'Content', score: 82 },
  { name: 'Delivery', score: 75 },
  { name: 'Structure', score: 88 },
  { name: 'Relevance', score: 90 },
  { name: 'Confidence', score: 65 },
];

const progressData = [
  { date: 'Apr 1', score: 65 },
  { date: 'Apr 8', score: 70 },
  { date: 'Apr 15', score: 68 },
  { date: 'Apr 22', score: 75 },
  { date: 'Apr 29', score: 72 },
  { date: 'May 6', score: 80 },
  { date: 'May 13', score: 82 },
  { date: 'May 20', score: 85 },
];

const Results = () => {
  const [selectedInterview, setSelectedInterview] = useState(0);
  const [isFullAnalysisOpen, setIsFullAnalysisOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("30");
  const { toast } = useToast();
  
  const interviews = [
    { 
      id: 1, 
      title: 'Software Engineer Interview', 
      date: 'May 20, 2023', 
      type: 'Technical',
      score: 85,
      questions: 5,
      duration: '32 minutes',
      strengths: ['Technical knowledge', 'Problem-solving approach', 'Communication clarity'],
      improvements: ['Provide more specific examples', 'Structure answers more concisely', 'Improve non-verbal communication']
    },
    { 
      id: 2, 
      title: 'Product Manager Practice', 
      date: 'May 15, 2023', 
      type: 'Behavioral',
      score: 78,
      questions: 7,
      duration: '45 minutes',
      strengths: ['Stakeholder management', 'Strategic thinking', 'User focus'],
      improvements: ['Quantify business impact', 'Address prioritization more clearly', 'Show more leadership examples']
    },
    { 
      id: 3, 
      title: 'Marketing Specialist', 
      date: 'May 8, 2023', 
      type: 'Mixed',
      score: 72,
      questions: 6,
      duration: '38 minutes',
      strengths: ['Campaign experience', 'Analytics knowledge', 'Creative ideas'],
      improvements: ['ROI discussions', 'More data-driven responses', 'Streamline lengthy answers']
    },
  ];

  const handleDownloadReport = () => {
    const selectedInterviewReport = {
      title: interviews[selectedInterview].title,
      date: interviews[selectedInterview].date,
      score: interviews[selectedInterview].score,
      type: interviews[selectedInterview].type,
      strengths: interviews[selectedInterview].strengths,
      improvements: interviews[selectedInterview].improvements
    };

    downloadMockReport(selectedInterviewReport);

    toast({
      title: "Report Downloaded",
      description: `${selectedInterviewReport.title} report has been generated.`,
      variant: "default",
    });
  };

  const handleShareResult = (interviewId: number) => {
    // In a real app, this would generate a shareable link or open a share dialog
    toast({
      title: "Interview Shared",
      description: "A shareable link has been copied to your clipboard.",
      variant: "default",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Your performance data has been exported to CSV.",
      variant: "default",
    });
  };

  const handleDateFilterChange = (days: string) => {
    setDateFilter(days);
    toast({
      title: "Filter Applied",
      description: `Showing data for the last ${days} days.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Interview Results</h1>
            <p className="text-xl text-gray-600">Track progress and review performance insights</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="stroke-current text-gray-200"
                        fill="none"
                        strokeWidth="3"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="stroke-current text-interview-primary"
                        fill="none"
                        strokeWidth="3"
                        strokeDasharray={`${80}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                      80%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Based on your last 5 interviews</div>
                    <div className="flex items-center text-green-600 text-sm mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 
                      8% improvement
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-interview-primary">12</div>
                    <div className="text-sm text-gray-500">Interviews</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-interview-primary">78</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-interview-primary">6.4</div>
                    <div className="text-sm text-gray-500">Hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Top Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm text-interview-primary">92%</span>
                    </div>
                    <Progress value={92} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Communication</span>
                      <span className="text-sm text-interview-primary">85%</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Leadership</span>
                      <span className="text-sm text-interview-primary">78%</span>
                    </div>
                    <Progress value={78} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-2xl">Performance Trends</CardTitle>
                  <div className="flex space-x-3 mt-3 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => handleDateFilterChange("30")}
                    >
                      <Calendar className="mr-1 h-4 w-4" />
                      Last {dateFilter} Days
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={handleExportData}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="progress">
                  <TabsList className="mb-4">
                    <TabsTrigger value="progress" className="flex items-center">
                      <LineChartIcon className="h-4 w-4 mr-2" /> Progress
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" /> Skills
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="progress">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 100]} />
                          <RechartsTooltip />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#0EA5E9" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: "#0EA5E9" }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <RechartsTooltip />
                          <Bar dataKey="score" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Interviews</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                    <Card 
                      key={interview.id} 
                      className={`cursor-pointer transition-all ${selectedInterview === index ? 'ring-2 ring-interview-primary' : ''}`}
                      onClick={() => setSelectedInterview(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{interview.title}</h3>
                          <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                            interview.type === 'Technical' 
                              ? 'bg-blue-100 text-blue-700' 
                              : interview.type === 'Behavioral'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            {interview.type}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-3">{interview.date}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Score: <span className="font-semibold text-interview-primary">{interview.score}%</span></div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShareResult(interview.id);
                                  }}
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Share this interview result</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>{interviews[selectedInterview].title}</CardTitle>
                    <CardDescription>{interviews[selectedInterview].date} • {interviews[selectedInterview].type} Interview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-interview-primary">{interviews[selectedInterview].score}%</div>
                        <div className="text-sm text-gray-500">Overall Score</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-interview-primary">{interviews[selectedInterview].questions}</div>
                        <div className="text-sm text-gray-500">Questions</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-interview-primary">{interviews[selectedInterview].duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Strengths</h4>
                        <ul className="space-y-2">
                          {interviews[selectedInterview].strengths.map((strength, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                              </div>
                              <span className="text-gray-700">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Areas for Improvement</h4>
                        <ul className="space-y-2">
                          {interviews[selectedInterview].improvements.map((improvement, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                              </div>
                              <span className="text-gray-700">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="flex items-center"
                              onClick={handleDownloadReport}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate a detailed PDF report of your interview performance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              className="bg-interview-primary hover:bg-interview-secondary text-white"
                              onClick={() => setIsFullAnalysisOpen(true)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Full Analysis
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>See a comprehensive breakdown of your interview performance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isFullAnalysisOpen} onOpenChange={setIsFullAnalysisOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Full Analysis: {interviews[selectedInterview].title}</DialogTitle>
            <DialogDescription>
              Complete breakdown of your interview performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Interview Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{interviews[selectedInterview].date}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Type</div>
                  <div className="font-medium">{interviews[selectedInterview].type}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{interviews[selectedInterview].duration}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Questions</div>
                  <div className="font-medium">{interviews[selectedInterview].questions}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Performance Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Bar dataKey="score" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Strengths</h3>
              <div className="space-y-3">
                {interviews[selectedInterview].strengths.map((strength, idx) => (
                  <div key={idx} className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md">
                    <div className="font-medium text-green-800">{strength}</div>
                    <p className="text-green-700 text-sm mt-1">
                      You demonstrated strong capabilities in this area, which positively impacted your overall performance.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Areas for Improvement</h3>
              <div className="space-y-3">
                {interviews[selectedInterview].improvements.map((improvement, idx) => (
                  <div key={idx} className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md">
                    <div className="font-medium text-amber-800">{improvement}</div>
                    <p className="text-amber-700 text-sm mt-1">
                      Working on this area will help you improve your overall interview performance.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommended Next Steps</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Practice focusing on the areas of improvement identified above</li>
                <li>Review sample answers for similar questions in our question bank</li>
                <li>Schedule another practice interview focusing on your weaker areas</li>
                <li>Consider upgrading to our Pro plan for more detailed feedback</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={handleDownloadReport}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              className="bg-interview-primary hover:bg-interview-secondary text-white"
              onClick={() => setIsFullAnalysisOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Results;
