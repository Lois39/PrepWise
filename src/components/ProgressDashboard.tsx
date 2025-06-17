
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Award, BarChart, Target, TrendingUp } from 'lucide-react';

interface ProgressData {
  overallScore: number;
  completedInterviews: number;
  totalQuestions: number;
  improvementRate: number;
  categoryScores: {
    behavioral: number;
    technical: number;
    leadership: number;
    industry: number;
    case: number;
    performance: number;
  };
  recentScores: number[];
}

// Mock data - would come from actual user data in production
const mockProgressData: ProgressData = {
  overallScore: 72,
  completedInterviews: 8,
  totalQuestions: 24,
  improvementRate: 15,
  categoryScores: {
    behavioral: 83,
    technical: 65,
    leadership: 72,
    industry: 68,
    case: 59,
    performance: 77
  },
  recentScores: [65, 68, 70, 72, 75, 73, 78, 72]
};

const ProgressDashboard = () => {
  const { overallScore, completedInterviews, totalQuestions, improvementRate, categoryScores, recentScores } = mockProgressData;

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="hover-lift border-t-4 border-t-interview-primary slide-in-up stagger-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-interview-light flex items-center justify-center pulse">
                <Award className="h-7 w-7 text-interview-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{overallScore}/100</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{improvementRate}% improvement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-t-4 border-t-interview-secondary slide-in-up stagger-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-interview-light flex items-center justify-center pulse">
                <LineChart className="h-7 w-7 text-interview-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{completedInterviews}</div>
                <p className="text-xs text-gray-500">Total practice sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-t-4 border-t-interview-accent slide-in-up stagger-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Questions Answered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-interview-light flex items-center justify-center pulse">
                <Target className="h-7 w-7 text-interview-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{totalQuestions}</div>
                <p className="text-xs text-gray-500">Across all categories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-t-4 border-t-green-500 slide-in-up stagger-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Strongest Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-interview-light flex items-center justify-center pulse">
                <BarChart className="h-7 w-7 text-interview-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">Behavioral</div>
                <p className="text-xs text-gray-500">Score: {categoryScores.behavioral}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="w-full scale-in">
        <TabsList className="grid grid-cols-2 w-[400px] bg-gradient-blue text-white">
          <TabsTrigger value="categories" className="data-[state=active]:bg-white data-[state=active]:text-interview-primary">Category Performance</TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-interview-primary">Score Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="mt-6 fade-in">
          <Card className="card-gradient border shadow-lg">
            <CardHeader className="bg-interview-light bg-opacity-50 rounded-t-xl border-b">
              <CardTitle className="text-lg text-interview-primary flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Performance by Interview Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {Object.entries(categoryScores).map(([category, score], index) => (
                <div key={category} className={`space-y-2 slide-in-right stagger-${index + 1}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 bg-interview-${index % 2 === 0 ? 'primary' : 'secondary'}`}></span>
                      {category}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{score}/100</span>
                  </div>
                  <div className="relative">
                    <Progress value={score} className="h-2.5 bg-gray-100" />
                    <span className="absolute text-[10px] font-medium text-white px-1 py-0.5 rounded-sm bg-interview-primary" 
                          style={{ left: `${score - 5}%`, top: '-18px' }}>
                      {score}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6 fade-in">
          <Card className="card-gradient border shadow-lg">
            <CardHeader className="bg-interview-light bg-opacity-50 rounded-t-xl border-b">
              <CardTitle className="text-lg text-interview-primary flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Score Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] flex items-end space-x-2">
                {recentScores.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center slide-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                    <div 
                      className="w-full rounded-t-lg bg-gradient-blue" 
                      style={{ height: `${score * 2}px`, transition: 'height 1s ease-out', transitionDelay: `${0.1 * index}s` }}
                    ></div>
                    <div className="w-full h-1 bg-interview-light"></div>
                    <span className="text-xs mt-2 font-medium">#{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <div className="text-sm text-gray-600 flex flex-col items-center">
                  <span className="text-xs text-gray-500">First Interview</span>
                  <span className="font-semibold">{recentScores[0]}/100</span>
                </div>
                <div className="text-sm text-gray-600 flex flex-col items-center">
                  <span className="text-xs text-gray-500">Latest Interview</span>
                  <span className="font-semibold">{recentScores[recentScores.length - 1]}/100</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs">Improvement Trend</span>
                  </div>
                  <span className="text-sm font-semibold text-green-500">+{improvementRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressDashboard;
