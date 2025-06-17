
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecordingAnalysisProps {
  type: 'audio';
  analysis: {
    pace: number;
    clarity: number;
    tone: number;
    confidence: number;
    overallScore: number;
    feedback: string[];
  };
  onDownload?: () => void;
}

const RecordingAnalysis = ({ type, analysis, onDownload }: RecordingAnalysisProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-emerald-600';
    if (score >= 70) return 'bg-amber-600';
    return 'bg-red-600';
  };

  return (
    <Card className="mb-6 border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Audio Delivery Analysis</span>
          <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
            {analysis.overallScore}/100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Speaking Pace</span>
              <span className={`text-sm ${getScoreColor(analysis.pace)}`}>{analysis.pace}/100</span>
            </div>
            <Progress value={analysis.pace} className={`h-2 ${getProgressColor(analysis.pace)}`} />
            
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Clarity</span>
              <span className={`text-sm ${getScoreColor(analysis.clarity)}`}>{analysis.clarity}/100</span>
            </div>
            <Progress value={analysis.clarity} className={`h-2 ${getProgressColor(analysis.clarity)}`} />
            
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Tonal Variation</span>
              <span className={`text-sm ${getScoreColor(analysis.tone)}`}>{analysis.tone}/100</span>
            </div>
            <Progress value={analysis.tone} className={`h-2 ${getProgressColor(analysis.tone)}`} />
            
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Confidence</span>
              <span className={`text-sm ${getScoreColor(analysis.confidence)}`}>{analysis.confidence}/100</span>
            </div>
            <Progress value={analysis.confidence} className={`h-2 ${getProgressColor(analysis.confidence)}`} />
          </div>
          
          <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium">Feedback & Recommendations</h4>
            {analysis.feedback.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                {item.includes("Great") || item.includes("Good") ? (
                  <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                )}
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          
          {onDownload && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={onDownload} className="text-sm">
                <Download className="mr-2 h-4 w-4" />
                Download Recording
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingAnalysis;
