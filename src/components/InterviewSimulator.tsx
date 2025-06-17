import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { 
  Brain, Send, Mic, MicOff, ThumbsUp, ThumbsDown, 
  RefreshCw, Clock, CheckCircle2, 
  XCircle, Sparkles, PlayCircle, Upload, Square
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getQuestionsByType } from '../utils/interviewQuestions';
import StarMethodFeedback from './StarMethodFeedback';
import JobDescriptionUpload from './JobDescriptionUpload';
import VideoAudioRecorder from './VideoAudioRecorder';
import RecordingAnalysis from './RecordingAnalysis';
import InterviewSummary from './InterviewSummary';

interface Question {
  id: number;
  type: string;
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface FeedbackItem {
  type: 'positive' | 'improvement';
  text: string;
}

interface AIFeedback {
  score: number;
  overview: string;
  details: FeedbackItem[];
  transcription?: string;
}

interface RecordingAnalysisData {
  pace: number;
  clarity: number;
  tone: number;
  confidence: number;
  overallScore: number;
  feedback: string[];
}

interface InterviewSimulatorProps {
  interviewType: string;
  jobRole: string;
}

const InterviewSimulator = ({ interviewType, jobRole }: InterviewSimulatorProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [actualTranscription, setActualTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [interviewStartTime, setInterviewStartTime] = useState<Date | null>(null);
  const [interviewResults, setInterviewResults] = useState<{
    questionResults: any[];
    recordingResults: any[];
    overallScore: number;
  } | null>(null);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [recordingAnalysis, setRecordingAnalysis] = useState<RecordingAnalysisData | null>(null);
  const [recordingType, setRecordingType] = useState<'audio' | null>(null);
  const [allResponses, setAllResponses] = useState<{
    question: Question;
    response: string;
    feedback: AIFeedback;
    recording?: {
      type: 'audio';
      analysis: RecordingAnalysisData;
    };
  }[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    const fetchedQuestions = getQuestionsByType(interviewType, jobRole);
    setQuestions(fetchedQuestions);
  }, [interviewType, jobRole]);

  const startPrepTime = () => {
    setIsPreparing(true);
    setTimeRemaining(10); // 10 seconds preparation time
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setIsPreparing(false);
          setIsInterviewStarted(true);
          setInterviewStartTime(new Date());
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Your response has been captured.",
      });
    } else {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(audioStream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Generate a more realistic transcription
          const mockTranscriptions = [
            "I believe my experience in project management makes me a strong fit for this role. In my previous position, I led a team of five developers and successfully delivered three major projects ahead of schedule and under budget.",
            "One of my greatest strengths is my ability to work well under pressure. For example, last year we had a critical system failure just before a major deadline, and I was able to coordinate the team to implement a solution within hours.",
            "When faced with conflicting priorities, I first assess the impact and urgency of each task. Then I communicate with stakeholders to ensure alignment on expectations and timelines before proceeding.",
            "I've found that clear communication is essential for team success. In my previous role, I implemented daily stand-ups and a centralized documentation system that reduced misunderstandings by 40%.",
            "My approach to leadership is collaborative but decisive. I value input from team members while ensuring that we maintain focus on our strategic objectives."
          ];
          
          const transcription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
          setActualTranscription(transcription);
          setUserResponse(transcription);
          
          audioStream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly to record your answer.",
        });
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
          title: "Microphone error",
          description: "Could not access your microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  const handleJobDescriptionQuestions = (generatedQuestions: any[]) => {
    setQuestions([...generatedQuestions, ...questions]);
    setShowJobDescriptionModal(false);
    toast({
      title: "Custom questions added",
      description: `${generatedQuestions.length} tailored questions have been added to your interview.`,
    });
  };

  const handleRecordingComplete = (blob: Blob, type: 'audio', analysis: RecordingAnalysisData) => {
    setRecordingType(type);
    setRecordingAnalysis(analysis);
    
    // In a real app, you would save the blob to storage here
    console.log(`${type} recording complete:`, blob);
  };

  const generateFeedback = (response: string, questionType: string): AIFeedback => {
    const responseLength = response.length;
    const hasStructure = response.includes("I") && response.includes("we") && response.length > 200;
    const hasDetail = responseLength > 500;
    const hasExample = response.includes("example") || response.includes("instance") || response.includes("situation");
    
    let score = 65;
    
    if (hasStructure) score += 10;
    if (hasDetail) score += 10;
    if (hasExample) score += 15;
    
    score = Math.min(score, 100);
    
    const positives: FeedbackItem[] = [];
    const improvements: FeedbackItem[] = [];
    
    if (hasStructure) {
      positives.push({ type: 'positive', text: 'Your response has a clear structure with a beginning, middle, and end.' });
    }
    if (hasDetail) {
      positives.push({ type: 'positive', text: 'You provided good detail and specific information in your answer.' });
    }
    if (hasExample) {
      positives.push({ type: 'positive', text: 'Great use of concrete examples to illustrate your points.' });
    }
    
    if (!hasStructure) {
      improvements.push({ type: 'improvement', text: 'Consider using the STAR method (Situation, Task, Action, Result) to better structure your response.' });
    }
    if (!hasDetail) {
      improvements.push({ type: 'improvement', text: 'Your answer would benefit from more specific details about your experience or approach.' });
    }
    if (!hasExample) {
      improvements.push({ type: 'improvement', text: 'Including a concrete example would strengthen your answer significantly.' });
    }
    
    switch (questionType) {
      case 'behavioral':
        positives.push({ type: 'positive', text: 'You effectively communicated your personal experience and actions.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Try to emphasize what you learned or how you grew from the experience.' });
        break;
      case 'technical':
        positives.push({ type: 'positive', text: 'You demonstrated technical knowledge in your response.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Consider adding more technical specifics or methodology details to showcase your expertise.' });
        break;
      case 'leadership':
        positives.push({ type: 'positive', text: 'You articulated your leadership approach well.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Include more about how you motivated others or overcame team challenges.' });
        break;
      case 'industry':
        positives.push({ type: 'positive', text: 'You showed good industry awareness in your response.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Referencing current industry trends or challenges would strengthen your answer.' });
        break;
      case 'case':
        positives.push({ type: 'positive', text: 'You provided a thoughtful analysis of the business scenario.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Adding more quantitative reasoning or considering additional stakeholders would improve your case analysis.' });
        break;
      case 'performance':
        positives.push({ type: 'positive', text: 'You effectively highlighted your achievements and impact.' });
        if (score < 85) improvements.push({ type: 'improvement', text: 'Adding specific metrics or outcomes would make your contributions more tangible.' });
        break;
    }
    
    let overview = '';
    if (score >= 90) {
      overview = "Excellent response that effectively addresses the question with clear structure, specific examples, and relevant details.";
    } else if (score >= 80) {
      overview = "Strong response that demonstrates your capabilities, with good structure and examples.";
    } else if (score >= 70) {
      overview = "Good response that addresses the question, but could be enhanced with more specific examples and details.";
    } else {
      overview = "Satisfactory response that addresses the basic elements of the question, but needs significant improvement in structure and specificity.";
    }
    
    const details = [...positives, ...improvements];
    
    return {
      score,
      overview,
      details,
      transcription: response
    };
  };

  const compileInterviewResults = () => {
    // Calculate overall score from all responses
    let totalScore = 0;
    const questionResults = allResponses.map(item => {
      totalScore += item.feedback.score;
      return {
        id: item.question.id,
        question: item.question.text,
        answer: item.response,
        score: item.feedback.score,
        strengths: item.feedback.details
          .filter(detail => detail.type === 'positive')
          .map(detail => detail.text),
        improvements: item.feedback.details
          .filter(detail => detail.type === 'improvement')
          .map(detail => detail.text)
      };
    });
    
    // Compile recording results if available
    const recordingResults = allResponses
      .filter(item => item.recording)
      .map(item => ({
        type: item.recording!.type,
        overallScore: item.recording!.analysis.overallScore,
        pace: item.recording!.analysis.pace,
        clarity: item.recording!.analysis.clarity,
        tone: item.recording!.analysis.tone,
        confidence: item.recording!.analysis.confidence
      }));
    
    const overallScore = Math.round(totalScore / allResponses.length);
    
    return {
      questionResults,
      recordingResults,
      overallScore
    };
  };

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) {
      toast({
        title: "Empty response",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      setTimeout(() => {
        const aiResponse = generateFeedback(userResponse, interviewType);
        setFeedback(aiResponse);
        
        // Add response to collection for final summary
        const currentQuestion = questions[currentQuestionIndex];
        const responseData = {
          question: currentQuestion,
          response: userResponse,
          feedback: aiResponse,
          ...(recordingAnalysis && recordingType ? {
            recording: {
              type: recordingType,
              analysis: recordingAnalysis
            }
          } : {})
        };
        
        setAllResponses(prev => [...prev, responseData]);
        setIsSubmitting(false);
        
        // Reset recording data
        setRecordingAnalysis(null);
        setRecordingType(null);
        
        try {
          const user = supabase.auth.getUser();
          const saveResponse = async () => {
            const { error } = await supabase
              .from('interview_responses')
              .insert({
                user_id: (await user).data?.user?.id,
                question: questions[currentQuestionIndex].text,
                response: userResponse,
                feedback_score: aiResponse.score,
                interview_type: interviewType
              });
            
            if (error) {
              console.error("Error saving response to database:", error);
            }
          };
          
          saveResponse().catch(err => {
            console.error("Failed to save response:", err);
          });
        } catch (err) {
          console.error("Failed to save response:", err);
        }
      }, 2000);
    } catch (error) {
      console.error("Error analyzing response:", error);
      setIsSubmitting(false);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserResponse('');
      setActualTranscription('');
      setFeedback(null);
      setRecordingType(null);
      setRecordingAnalysis(null);
    } else {
      setInterviewFinished(true);
      const results = compileInterviewResults();
      setInterviewResults(results);
      toast({
        title: "Interview completed",
        description: "Your interview session has been completed successfully!",
      });
    }
  };

  const downloadInterviewSummary = () => {
    toast({
      title: "Downloading summary",
      description: "Your interview summary is being prepared for download.",
    });
    // In a real app, you would generate and download a PDF here
  };
  
  const scheduleCoachSession = () => {
    window.location.href = "/schedule";
  };

  if (showIntroDialog) {
    return (
      <Dialog open={showIntroDialog} onOpenChange={setShowIntroDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Welcome to Your Interview</DialogTitle>
            <DialogDescription className="text-center">
              Preparing {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} questions for {jobRole} role
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="text-center mb-4">
              <Mic className="h-12 w-12 mx-auto text-interview-primary mb-2" />
              <h3 className="text-lg font-medium">Get Ready for Your {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="font-medium">What to expect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You'll answer {questions.length} questions typical in {interviewType} interviews for {jobRole} roles</li>
                <li>Record audio responses for delivery analysis</li>
                <li>Receive real-time transcription of your responses</li>
                <li>You'll receive AI-powered feedback on each response</li>
                <li>Get a complete interview summary at the end</li>
              </ul>
            </div>
            
            <div className="flex justify-between mt-2">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowIntroDialog(false);
                  setShowJobDescriptionModal(true);
                }}
                className="flex items-center"
              >
                <Upload className="mr-2 h-4 w-4" /> Use Job Description
              </Button>
              
              <Button 
                onClick={() => {
                  setShowIntroDialog(false);
                  startPrepTime();
                }}
                className="bg-interview-primary hover:bg-interview-secondary text-white"
              >
                <PlayCircle className="mr-2 h-4 w-4" /> Start Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showJobDescriptionModal) {
    return (
      <Dialog open={showJobDescriptionModal} onOpenChange={setShowJobDescriptionModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Questions from Job Description</DialogTitle>
            <DialogDescription>
              Paste a job description to receive tailored interview questions
            </DialogDescription>
          </DialogHeader>
          <JobDescriptionUpload onQuestionsGenerated={handleJobDescriptionQuestions} />
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowJobDescriptionModal(false);
                startPrepTime();
              }}
            >
              Skip & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (interviewFinished && interviewResults) {
    return (
      <InterviewSummary
        interviewType={interviewType}
        jobRole={jobRole}
        date={interviewStartTime || new Date()}
        duration={Math.round((new Date().getTime() - (interviewStartTime?.getTime() || 0)) / 60000)}
        overallScore={interviewResults.overallScore}
        questionResults={interviewResults.questionResults}
        recordingResults={interviewResults.recordingResults}
        onDownloadPDF={downloadInterviewSummary}
        onScheduleSession={scheduleCoachSession}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-medium text-interview-primary">
            {Math.round((currentQuestionIndex + 1) / questions.length * 100)}% Complete
          </div>
        </div>
        <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="h-2" />
      </div>
      
      {isPreparing ? (
        <Card className="mb-6 border-2 border-interview-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Prepare Your Answer</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-interview-primary" />
            </div>
            <p className="text-2xl font-bold mb-2">{timeRemaining} seconds</p>
            <p className="text-gray-600">Take a moment to think about your answer to:</p>
            <p className="font-medium text-lg mt-2">{questions[currentQuestionIndex]?.text || "Loading question..."}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-medium text-gray-900">
                  {questions[currentQuestionIndex]?.text || "Loading question..."}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isInterviewStarted ? (
                <div className="space-y-4">
                  {!feedback && !recordingAnalysis && (
                    <VideoAudioRecorder 
                      onRecordingComplete={handleRecordingComplete} 
                      mode="audio" 
                    />
                  )}
                  
                  {recordingAnalysis && recordingType && !feedback && (
                    <RecordingAnalysis 
                      type={recordingType} 
                      analysis={recordingAnalysis} 
                    />
                  )}
                  
                  <Textarea
                    placeholder="Type your response here or use the audio recorder above..."
                    className="min-h-[150px] resize-none"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    disabled={isRecording || isSubmitting || feedback !== null}
                  />
                  
                  {actualTranscription && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <p className="text-sm font-medium mb-1">Your Recorded Response:</p>
                      <p className="text-gray-700 text-sm">{actualTranscription}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      className={isRecording ? "border-red-500 text-red-500" : ""}
                      onClick={toggleRecording}
                      disabled={isSubmitting || feedback !== null}
                    >
                      {isRecording ? (
                        <>
                          <Square className="mr-2 h-4 w-4" /> Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" /> Record Response
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={handleSubmitResponse} 
                      disabled={!userResponse.trim() || isSubmitting || feedback !== null}
                      className="bg-interview-primary hover:bg-interview-secondary text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Submit Response
                        </>
                      )}
                    </Button>
                    
                    <div className="flex-1"></div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setShowJobDescriptionModal(true)}
                      className="text-interview-primary"
                      disabled={isSubmitting || feedback !== null || isRecording}
                    >
                      <Upload className="mr-2 h-4 w-4" /> Add Questions from Job Description
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Button
                    onClick={() => setIsInterviewStarted(true)}
                    className="bg-interview-primary hover:bg-interview-secondary text-white"
                  >
                    Begin Interview
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {feedback && (
            <>
              <Card className="mb-6 border-l-4 border-l-interview-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-interview-primary" />
                      <CardTitle className="text-lg font-medium">AI Feedback</CardTitle>
                    </div>
                    <div className={`text-white text-sm font-medium px-2 py-1 rounded ${
                      feedback.score >= 90 ? 'bg-green-500' : 
                      feedback.score >= 75 ? 'bg-interview-primary' : 
                      feedback.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}>
                      Score: {feedback.score}/100
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{feedback.overview}</p>
                  
                  <div className="space-y-3">
                    {feedback.details.map((item, index) => (
                      <div key={index} className="flex items-start">
                        {item.type === 'positive' ? (
                          <ThumbsUp className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <ThumbsDown className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={handleNextQuestion} 
                      className="bg-interview-primary hover:bg-interview-secondary text-white"
                    >
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Interview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <StarMethodFeedback response={userResponse} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InterviewSimulator;
