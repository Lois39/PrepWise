
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Share2, Trophy, Calendar, CheckCircle2, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuestionResult {
  id: number;
  question: string;
  answer: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

interface RecordingResult {
  type: 'video' | 'audio';
  overallScore: number;
  pace: number;
  clarity: number;
  tone: number;
  confidence: number;
}

interface InterviewSummaryProps {
  interviewType: string;
  jobRole: string;
  date: Date;
  duration: number; // in minutes
  overallScore: number;
  questionResults: QuestionResult[];
  recordingResults?: RecordingResult[];
  onDownloadPDF?: () => void;
  onScheduleSession?: () => void;
}

const InterviewSummary: React.FC<InterviewSummaryProps> = ({
  interviewType,
  jobRole,
  date,
  duration,
  overallScore,
  questionResults,
  recordingResults,
  onDownloadPDF,
  onScheduleSession
}) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreText = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const calculateStrengthsWeaknesses = () => {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Process question results
    questionResults.forEach(result => {
      if (result.score >= 75) {
        strengths.push(...result.strengths);
      } else {
        weaknesses.push(...result.improvements);
      }
    });

    // Process recording results if available
    if (recordingResults && recordingResults.length > 0) {
      const avgRecording = recordingResults[0];
      
      if (avgRecording.pace >= 80) strengths.push('Excellent speaking pace');
      else weaknesses.push('Work on maintaining a consistent speaking pace');
      
      if (avgRecording.clarity >= 80) strengths.push('Clear and articulate speech');
      else weaknesses.push('Focus on clearer pronunciation');
      
      if (avgRecording.confidence >= 80) strengths.push('Confident delivery style');
      else weaknesses.push('Work on projecting more confidence');
    }

    // Deduplicate and limit
    return {
      topStrengths: [...new Set(strengths)].slice(0, 3),
      topWeaknesses: [...new Set(weaknesses)].slice(0, 3)
    };
  };

  const { topStrengths, topWeaknesses } = calculateStrengthsWeaknesses();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold mb-1">Interview Summary</CardTitle>
              <CardDescription>
                {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview for {jobRole}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
              <div className="text-sm text-gray-500">{getScoreText(overallScore)}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <div className="text-sm text-gray-600">Date & Time</div>
              <div className="font-medium">{formatDate(date)}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <div className="text-sm text-gray-600">Questions Answered</div>
              <div className="font-medium">{questionResults.length}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <BarChart3 className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-medium">{duration} minutes</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-amber-500" />
              Performance Highlights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-600 mb-2">Key Strengths</h4>
                <ul className="space-y-1">
                  {topStrengths.map((strength, index) => (
                    <li key={`strength-${index}`} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-amber-600 mb-2">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {topWeaknesses.map((weakness, index) => (
                    <li key={`weakness-${index}`} className="flex items-start">
                      <span className="h-4 w-4 border border-amber-500 rounded-full mr-2 mt-0.5 flex-shrink-0"></span>
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {recordingResults && recordingResults.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-semibold">Delivery Analysis</h3>
              {recordingResults.map((result, index) => (
                <div key={`recording-${index}`} className="space-y-3">
                  <div className="text-sm text-gray-600 mb-1">
                    {result.type === 'video' ? 'Video' : 'Audio'} Performance
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Pace</span>
                        <span className="text-xs font-medium">{result.pace}%</span>
                      </div>
                      <Progress value={result.pace} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Clarity</span>
                        <span className="text-xs font-medium">{result.clarity}%</span>
                      </div>
                      <Progress value={result.clarity} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Tone</span>
                        <span className="text-xs font-medium">{result.tone}%</span>
                      </div>
                      <Progress value={result.tone} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Confidence</span>
                        <span className="text-xs font-medium">{result.confidence}%</span>
                      </div>
                      <Progress value={result.confidence} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 pt-2">
            <h3 className="text-lg font-semibold">Question Performance</h3>
            {questionResults.map((result, index) => (
              <div key={`question-${result.id}`} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{index + 1}. {result.question}</div>
                  <div className={`text-sm font-bold ${getScoreColor(result.score)}`}>{result.score}/100</div>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{result.answer}</p>
                <Progress value={result.score} className={`h-1.5 mb-2`} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4 justify-center">
            {onDownloadPDF && (
              <Button onClick={onDownloadPDF} className="flex-1 md:flex-none">
                <Download className="mr-2 h-4 w-4" />
                Download Summary
              </Button>
            )}
            {onScheduleSession && (
              <Button variant="outline" onClick={onScheduleSession} className="flex-1 md:flex-none">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Coach Session
              </Button>
            )}
            <Button variant="outline" className="flex-1 md:flex-none">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSummary;
